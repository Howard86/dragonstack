package com.dragonstack.service;

import com.dragonstack.constant.TraitConstant;
import com.dragonstack.model.entity.Trait;
import com.dragonstack.persistance.TraitRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TraitServiceImpl implements TraitService {

    private final TraitRepository traitRepository;

    @Override
    public void createDefault() {
        traitRepository.saveAll(List.of(TraitConstant.TRAITS));
    }

    @Override
    public int getTraitCount() {
        return traitRepository.findAll().size();
    }

    @Override
    public List<Trait> getValuesByType(String traitType) {
        return traitRepository.findByTraitType(traitType);
    }
}
