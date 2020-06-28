package com.dragonstack.service;

import com.dragonstack.model.entity.Trait;

import java.util.List;

public interface TraitService {

    void createDefault();

    int getTraitCount();

    List<Trait> getTraitValuesByTraitType(String traitType);
}
