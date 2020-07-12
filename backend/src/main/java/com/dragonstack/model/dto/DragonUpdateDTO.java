package com.dragonstack.model.dto;

import com.dragonstack.model.entity.Account;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class DragonUpdateDTO {

    @NotNull
    private Long id;

    private String nickname;
    private Boolean isPublic;
    private Integer sireValue;
    private Integer saleValue;
    private Account account;

}
