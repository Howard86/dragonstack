package com.dragonstack.service;

import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface DragonService {

    Dragon createNewDragon(Account account);

    List<Dragon> getOwnedDragons(Account account);

    List<Dragon> getPublicDragons();

    Optional<Dragon> getOne(Long id);

    Dragon update(Dragon dragon);

    Dragon buy(Account account, Dragon dragon);

    Dragon breed(Dragon ownedDragon, Dragon siredDragon);
}
