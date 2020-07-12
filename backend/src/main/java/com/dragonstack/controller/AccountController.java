package com.dragonstack.controller;

import com.dragonstack.YAMLConfig;
import com.dragonstack.constant.SecurityConstants;
import com.dragonstack.model.dto.AccountCreationDTO;
import com.dragonstack.model.dto.AccountInfoDTO;
import com.dragonstack.model.entity.Account;
import com.dragonstack.service.AccountService;
import com.dragonstack.util.Parser;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ModelMapper modelMapper;
    private final YAMLConfig config;
    private final AccountService accountService;

//    @PostMapping("/login") is at security.WebSecurity

    @PostMapping("/sign-up")
    public ResponseEntity<AccountInfoDTO> signUp(@RequestBody AccountCreationDTO accountCreationDTO) {
        String username = accountCreationDTO.getUsername();

        if (accountService.getAccount(username).isPresent()) {
            throw new RuntimeException("Account with username " + username + " already exists");
        }

        Account account = convertToEntity(accountCreationDTO);
        account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
        accountService.updateAccount(account);
        return new ResponseEntity<>(convertToDTO(account), HttpStatus.CREATED);
    }

    @GetMapping("/info")
    public ResponseEntity<AccountInfoDTO> getInfo(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        String username = Parser.parseJWTHeader(header, config.getSecret());
        Optional<Account> account = accountService.getAccount(username);

        if (account.isEmpty()) {
            throw new RuntimeException("Account not found from header");
        }

        return new ResponseEntity<>(convertToDTO(account.get()), HttpStatus.OK);
    }

    private Account convertToEntity(AccountCreationDTO accountCreationDTO) {
        return modelMapper.map(accountCreationDTO, Account.class);
    }

    private AccountInfoDTO convertToDTO(Account account) {
        return modelMapper.map(account, AccountInfoDTO.class);
    }
}
