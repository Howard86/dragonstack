package com.dragonstack.service;

import com.dragonstack.model.entity.Account;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AccountService accountService;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = accountService.getAccount(username);
        if (account.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new User(account.get().getUsername(), account.get().getPassword(), Collections.emptyList());
    }
}
