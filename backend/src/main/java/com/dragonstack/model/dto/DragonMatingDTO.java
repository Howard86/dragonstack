package com.dragonstack.model.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class DragonMatingDTO {

    @NotNull
    private Long ownedDragonId;

    @NotNull
    private Long siredDragonId;

}
