package com.dragonstack.service;

import com.dragonstack.model.entity.Account;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface AccountService {

    Optional<Account> getAccount(String username);

    Account updateAccount(Account account);
}

