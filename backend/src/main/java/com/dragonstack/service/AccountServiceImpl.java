package com.dragonstack.service;

import com.dragonstack.model.entity.Account;
import com.dragonstack.persistance.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public Optional<Account> getAccount(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public Account updateAccount(Account account) {
        return accountRepository.saveAndFlush(account);
    }
}
