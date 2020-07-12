package com.dragonstack.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

//TODO: Probably don't need Lombok constructor annotation
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Trait {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String traitType;

    @NotNull
    private String traitValue;

    public Trait(@NotNull String traitType, @NotNull String traitValue) {
        this.traitType = traitType;
        this.traitValue = traitValue;
    }
}
