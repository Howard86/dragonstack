package com.dragonstack.model.dto;

import com.dragonstack.model.entity.Generation;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;

@Getter
@Setter
public class DragonInfoDTO {

    @NotNull
    private Long id;

    private LocalDateTime birthdate;
    private String nickname;
    private int sireValue;
    private int saleValue;
    private boolean isPublic;

    private HashSet<TraitDTO> traits;

    private Generation generation;

    private AccountInfoDTO account;
}
