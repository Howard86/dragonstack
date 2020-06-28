package com.dragonstack.service;

import com.dragonstack.constant.TraitConstant;
import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;
import com.dragonstack.model.entity.Generation;
import com.dragonstack.model.entity.Trait;
import com.dragonstack.persistance.DragonRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class DragonServiceImpl implements DragonService {

    private final GenerationService generationService;
    private final TraitService traitService;
    private final DragonRepository dragonRepository;


    @Override
    public Dragon create(Account account) {
        Generation generation = generationService.getCurrent();
        Set<Trait> traits = new HashSet<>();
//        TODO: improve this implementation
        for (String traitType : TraitConstant.TRAIT_TYPES) {
            traits.add(traitService.getTraitValuesByTraitType(traitType).get((int) (Math.random() * 4)));
        }
        Dragon dragon = new Dragon(
                null,
                LocalDateTime.now(),
                "A New Happy Dragon",
                false,
                0,
                0,
                traits,
                generation,
                account
        );
        dragonRepository.save(dragon);
        return dragon;
    }

    @Override
    public List<Dragon> getOwnedDragons(Account account) {
        return dragonRepository.findByAccountId(account.getId());
    }

    @Override
    public List<Dragon> getPublicDragons() {
        return dragonRepository.findByIsPublicTrue();
    }

    @Override
    public Optional<Dragon> getOne(Long id) {
        return dragonRepository.findById(id);
    }

    @Override
    public Dragon update(Dragon dragon) {
        return dragonRepository.saveAndFlush(dragon);
    }

    @Override
    public void buy(Long buyerId, Long dragonId) {

    }

    @Override
    public Dragon breed(Long matronId, Long patronId) {
        return null;
    }
}
