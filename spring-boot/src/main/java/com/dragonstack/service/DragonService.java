package com.dragonstack.service;

import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;

import java.util.List;
import java.util.Optional;

public interface DragonService {

    Dragon create(Account account);

    List<Dragon> getOwnedDragons(Account account);

    List<Dragon> getPublicDragons();

    Optional<Dragon> getOne(Long id);

    Dragon update(Dragon dragon);

    void buy(Long buyerId, Long dragonId);

    Dragon breed(Long matronId, Long patronId);
}
