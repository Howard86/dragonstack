package com.dragonstack.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DragonCreationDTO {

    private String name = "A New Happy Dragon";
    private LocalDateTime birthDate = LocalDateTime.now();
}
