package com.dragonstack.persistance;

import com.dragonstack.model.entity.Dragon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DragonRepository extends JpaRepository<Dragon, Long> {

    List<Dragon> findByAccountId(Long accountId);

    List<Dragon> findByIsPublicTrue();
}
