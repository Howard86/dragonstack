package com.dragonstack.controller;

import com.dragonstack.constant.SecurityConstants;
import com.dragonstack.model.dto.AccountCreationDTO;
import com.dragonstack.model.dto.AccountInfoDTO;
import com.dragonstack.model.entity.Account;
import com.dragonstack.persistance.AccountRepository;
import com.dragonstack.util.Parser;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
@AllArgsConstructor
public class AccountController {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ModelMapper modelMapper;

//    @PostMapping("/login") is at security.WebSecurity

    @PostMapping("/sign-up")
    public ResponseEntity<AccountInfoDTO> signUp(@RequestBody AccountCreationDTO accountCreationDTO) {
        String username = accountCreationDTO.getUsername();
        Account dbAccount = accountRepository.findByUsername(username);
        if (dbAccount != null) {
            throw new RuntimeException("Account with username " + username + " already exists");
        }

        Account account = convertToEntity(accountCreationDTO);
        account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
        accountRepository.save(account);
        return new ResponseEntity<>(covertToDTO(account), HttpStatus.CREATED);
    }

    @GetMapping("/info")
    public ResponseEntity<AccountInfoDTO> getInfo(@RequestHeader(SecurityConstants.HEADER_STRING) String header) {
        String username = Parser.parseJWTHeader(header);
        Account account = accountRepository.findByUsername(username);
        return new ResponseEntity<>(covertToDTO(account), HttpStatus.OK);
    }

    private Account convertToEntity(AccountCreationDTO accountCreationDTO) {
        return modelMapper.map(accountCreationDTO, Account.class);
    }

    private AccountInfoDTO covertToDTO(Account account) {
        return modelMapper.map(account, AccountInfoDTO.class);
    }
}
