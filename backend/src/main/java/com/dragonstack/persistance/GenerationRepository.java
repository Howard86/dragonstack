package com.dragonstack.persistance;

import com.dragonstack.model.entity.Generation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerationRepository extends JpaRepository<Generation, Long> {
}
