package com.dragonstack.controller;

import com.dragonstack.YAMLConfig;
import com.dragonstack.constant.SecurityConstants;
import com.dragonstack.model.dto.DragonInfoDTO;
import com.dragonstack.model.dto.DragonMatingDTO;
import com.dragonstack.model.dto.DragonUpdateDTO;
import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;
import com.dragonstack.service.AccountService;
import com.dragonstack.service.DragonService;
import com.dragonstack.util.Parser;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dragons")
@AllArgsConstructor
@Slf4j
public class DragonController {

    private final DragonService dragonService;
    private final YAMLConfig config;
    private final ModelMapper modelMapper;
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<DragonInfoDTO>> getOwnedDragons(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        Account account = getAccount(header);
        List<Dragon> dragons = dragonService.getOwnedDragons(account);
        return new ResponseEntity<>(convertToDTOs(dragons), HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<DragonInfoDTO> getNewDragon(
            @RequestHeader(SecurityConstants.HEADER_STRING) String header
    ) {
        Account account = getAccount(header);
        Dragon dragon = dragonService.createNewDragon(account);
        return new ResponseEntity<>(convertToDTO(dragon), HttpStatus.CREATED);
    }

    @GetMapping("/public")
    public ResponseEntity<List<DragonInfoDTO>> getPublicDragons() {
        List<Dragon> dragons = dragonService.getPublicDragons();
        return new ResponseEntity<>(convertToDTOs(dragons), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<DragonInfoDTO> updateDragon(
            @RequestBody @NotNull DragonUpdateDTO dragonUpdateDTO,
            @RequestHeader(SecurityConstants.HEADER_STRING) String header
    ) throws NotFoundException, IllegalAccessException {

        Long id = dragonUpdateDTO.getId();
        Optional<Dragon> dragonOptional = dragonService.getOne(id);

        if (dragonOptional.isEmpty()) {
            throw new NotFoundException("Dragon with id " + id + " does not exist");
        }

        Dragon dragon = dragonOptional.get();
        Long ownerId = dragon.getAccount().getId();
        Long changerId = getAccount(header).getId();

        if (!ownerId.equals(changerId)) {
            throw new IllegalAccessException("dragon with id " + id + " is not yours");
        }

        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(dragonUpdateDTO, dragon);

        Dragon updatedDragon = dragonService.update(dragon);

        return new ResponseEntity<>(convertToDTO(updatedDragon), HttpStatus.OK);
    }

    //    TODO: update error types and response
    @PostMapping("/buy/{id}")
    public ResponseEntity<DragonInfoDTO> buyDragon(
            @RequestHeader(SecurityConstants.HEADER_STRING) String header,
            @PathVariable Long id
    ) throws NotFoundException {
        Optional<Dragon> dragonOptional = dragonService.getOne(id);
        if (dragonOptional.isEmpty()) {
            throw new NotFoundException("Dragon with id " + id + " does not exist");
        }

        Dragon dragon = dragonOptional.get();
        if (!dragon.isPublic()) {
            throw new RuntimeException("Dragon with id " + id + " is not public");
        }

        Account account = getAccount(header);

        if (account.getBalance() < dragon.getSaleValue()) {
            throw new RuntimeException(
                    "Account " + account.getUsername() + " does not have enough balance"
            );
        }

        Dragon boughtDragon = dragonService.buy(account, dragon);

        return new ResponseEntity<>(convertToDTO(boughtDragon), HttpStatus.OK);
    }

    //    TODO: update error types and response
    @PostMapping("/mate")
    public ResponseEntity<DragonInfoDTO> mateDragon(
            @RequestHeader(SecurityConstants.HEADER_STRING) String header,
            @RequestBody @NotNull DragonMatingDTO dragonMatingDTO
    ) throws NotFoundException, IllegalAccessException {
        Long ownedDragonId = dragonMatingDTO.getOwnedDragonId();
        Optional<Dragon> optionalOwnedDragon = dragonService.getOne(ownedDragonId);

        if (optionalOwnedDragon.isEmpty()) {
            throw new NotFoundException("Dragon with id " + ownedDragonId + " does not exist");
        }

        Dragon ownedDragon = optionalOwnedDragon.get();
        Account ownerAccount = getAccount(header);

        if (!ownerAccount.getId().equals(ownedDragon.getAccount().getId())) {
            throw new IllegalAccessException("dragon with id " + ownedDragonId + " is not yours");
        }

        Long matingDragonId = dragonMatingDTO.getSiredDragonId();
        Optional<Dragon> optionalMatingDragon = dragonService.getOne(matingDragonId);

        if (optionalMatingDragon.isEmpty()) {
            throw new NotFoundException("Dragon with id " + matingDragonId + " does not exist");
        }

        Dragon matingDragon = optionalMatingDragon.get();

        if (!matingDragon.isPublic()) {
            throw new RuntimeException("Dragon with id " + matingDragonId + " is not public");
        }

        if (ownerAccount.getBalance() < matingDragon.getSireValue()) {
            throw new RuntimeException(
                    "Account " + ownerAccount.getUsername() + " does not have enough balance"
            );
        }

        Dragon babyDragon = dragonService.breed(ownedDragon, matingDragon);

        return new ResponseEntity<>(convertToDTO(babyDragon), HttpStatus.CREATED);
    }

    private @NotNull Account getAccount(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        String username = Parser.parseJWTHeader(header, config.getSecret());
        Optional<Account> account = accountService.getAccount(username);

        if (account.isEmpty()) {
            throw new RuntimeException("Account not found from header");
        }

        return account.get();
    }

    private DragonInfoDTO convertToDTO(Dragon dragon) {
        return modelMapper.map(dragon, DragonInfoDTO.class);
    }

    private List<DragonInfoDTO> convertToDTOs(@NotNull List<Dragon> dragons) {
        return dragons.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}
