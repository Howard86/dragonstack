package com.dragonstack.controller;

import com.dragonstack.YAMLConfig;
import com.dragonstack.constant.SecurityConstants;
import com.dragonstack.model.dto.DragonInfoDTO;
import com.dragonstack.model.dto.DragonUpdateDTO;
import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;
import com.dragonstack.persistance.AccountRepository;
import com.dragonstack.service.DragonService;
import com.dragonstack.util.Parser;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final AccountRepository accountRepository;
    private final YAMLConfig config;
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<DragonInfoDTO>> getOwnedDragons(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        Account account = getAccount(header);
        List<Dragon> dragons = dragonService.getOwnedDragons(account);
        return new ResponseEntity<>(convertToDTOs(dragons), HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<DragonInfoDTO> getNewDragon(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        Account account = getAccount(header);
        Dragon dragon = dragonService.create(account);
        return new ResponseEntity<>(convertToDTO(dragon), HttpStatus.CREATED);
    }

    @GetMapping("/public")
    public ResponseEntity<List<DragonInfoDTO>> getPublicDragons() {
        List<Dragon> dragons = dragonService.getPublicDragons();
        return new ResponseEntity<>(convertToDTOs(dragons), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<DragonInfoDTO> updateDragon(
            @RequestBody DragonUpdateDTO dragonUpdateDTO,
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

    private Account getAccount(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        String username = Parser.parseJWTHeader(header, config.getSecret());
        return accountRepository.findByUsername(username);
    }

    private DragonInfoDTO convertToDTO(Dragon dragon) {
        return modelMapper.map(dragon, DragonInfoDTO.class);
    }

    private List<DragonInfoDTO> convertToDTOs(List<Dragon> dragons) {
        return dragons.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}
