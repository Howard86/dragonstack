package com.dragonstack.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
public class AccountCreationDTO {

    @NotNull
    private String username;

    @NotNull
    private String password;

    private int balance = 50;

    @JsonIgnore
    private final LocalDateTime createdAt = LocalDateTime.now();

    @JsonIgnore
    private final LocalDateTime updatedAt = LocalDateTime.now();
}
