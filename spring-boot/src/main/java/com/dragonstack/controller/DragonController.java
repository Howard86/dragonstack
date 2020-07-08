package com.dragonstack.controller;

import com.dragonstack.YAMLConfig;
import com.dragonstack.constant.SecurityConstants;
import com.dragonstack.model.dto.DragonUpdateDTO;
import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;
import com.dragonstack.persistance.AccountRepository;
import com.dragonstack.service.DragonService;
import com.dragonstack.util.Parser;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dragons")
@AllArgsConstructor
@Slf4j
public class DragonController {

    private final DragonService dragonService;
    private final AccountRepository accountRepository;
    private final YAMLConfig config;

    @GetMapping
    public ResponseEntity<List<Dragon>> getOwnedDragons(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        Account account = getAccount(header);
        List<Dragon> dragons = dragonService.getOwnedDragons(account);
        return new ResponseEntity<>(dragons, HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<Dragon> getNewDragon(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        Account account = getAccount(header);
        Dragon dragon = dragonService.create(account);
        return new ResponseEntity<>(dragon, HttpStatus.CREATED);
    }

    @GetMapping("/public")
    public ResponseEntity<List<Dragon>> getPublicDragons() {
        return new ResponseEntity<>(dragonService.getPublicDragons(), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<Dragon> updateDragon(
            @RequestBody DragonUpdateDTO dragonUpdateDTO,
            @RequestHeader(SecurityConstants.HEADER_STRING) String header
    ) throws NotFoundException {

        Long id = dragonUpdateDTO.getId();
        Optional<Dragon> dragonOptional = dragonService.getOne(id);

        if (dragonOptional.isEmpty()) {
            throw new NotFoundException("Dragon with id " + id + " does not exist");
        }

        Dragon dragon = dragonOptional.get();

// TODO: fix that dragon.getAccount is null
//        Long ownerId = dragon.getAccount().getId();
//        log.info("ownerId is {}", ownerId);
//        Long changerId = getAccount(header).getId();
//        log.info("changerId is {}", changerId);
//        if (!ownerId.equals(changerId)) {
//            throw new IllegalAccessException("dragon with id " + id + " is not yours");
//        }


//        TODO: improve this implementation with Object model
        if (dragonUpdateDTO.getNickname() != null) {
            dragon.setNickname(dragonUpdateDTO.getNickname());
        }
        if (dragonUpdateDTO.getSaleValue() != null) {
            dragon.setSaleValue(dragonUpdateDTO.getSaleValue());
        }
        if (dragonUpdateDTO.getSireValue() != null) {
            dragon.setSireValue(dragonUpdateDTO.getSireValue());
        }
        if (dragonUpdateDTO.getIsPublic() != null) {
            dragon.setPublic(dragonUpdateDTO.getIsPublic());
        }
        if (dragonUpdateDTO.getAccount() != null) {
            dragon.setAccount(dragonUpdateDTO.getAccount());
        }

        return new ResponseEntity<>(dragonService.update(dragon), HttpStatus.OK);
    }

    private Account getAccount(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        String username = Parser.parseJWTHeader(header, config.getSecret());
        return accountRepository.findByUsername(username);
    }
}
