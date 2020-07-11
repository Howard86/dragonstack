package com.dragonstack.service;

import com.dragonstack.model.entity.Trait;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface TraitService {

    void createDefault();

    int getTraitCount();

    List<Trait> getValuesByType(String traitType);
}
