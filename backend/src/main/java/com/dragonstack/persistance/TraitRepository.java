package com.dragonstack.persistance;

import com.dragonstack.model.entity.Trait;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TraitRepository extends JpaRepository<Trait, Long> {

    List<Trait> findByTraitType(String traitType);
}
