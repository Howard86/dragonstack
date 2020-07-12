package com.dragonstack.model.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TraitDTO {

    @NotNull
    private String traitType;

    @NotNull
    private String traitValue;
}
