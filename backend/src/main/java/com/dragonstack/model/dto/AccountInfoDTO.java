package com.dragonstack.model.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AccountInfoDTO {

    @NotNull
    private Long id;

    @NotNull
    private String username;

    private int balance;
}
