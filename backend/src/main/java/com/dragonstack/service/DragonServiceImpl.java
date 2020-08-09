package com.dragonstack.service;

import com.dragonstack.constant.TraitConstant;
import com.dragonstack.model.entity.Account;
import com.dragonstack.model.entity.Dragon;
import com.dragonstack.model.entity.Trait;
import com.dragonstack.persistance.DragonRepository;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class DragonServiceImpl implements DragonService {

    private final GenerationService generationService;
    private final TraitService traitService;
    private final DragonRepository dragonRepository;
    private final AccountService accountService;

    @Override
    public Dragon createNewDragon(Account account) {
        Set<Trait> traits = new HashSet<>();

        int range = TraitConstant.TRAIT_TYPES.length;
        for (String traitType : TraitConstant.TRAIT_TYPES) {
            traits.add(traitService.getValuesByType(traitType).get(getRandomIntInRange(range)));
        }

        return generateDragon(traits, account);
    }

    @Override
    public List<Dragon> getOwnedDragons(@NotNull Account account) {
        return dragonRepository.findByAccountIdOrderByIdDesc(account.getId());
    }

    @Override
    public List<Dragon> getPublicDragons() {
        return dragonRepository.findByIsPublicTrueOrderByIdDesc();
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
    public Dragon buy(@NotNull Account buyerAccount, @NotNull Dragon dragon) {

        buyerAccount.setBalance(buyerAccount.getBalance() - dragon.getSaleValue());
        accountService.updateAccount(buyerAccount);

        Account sellerAccount = dragon.getAccount();
        sellerAccount.setBalance(sellerAccount.getBalance() + dragon.getSaleValue());
        accountService.updateAccount(sellerAccount);

        dragon.setPublic(false);
        dragon.setSaleValue(0);
        dragon.setSireValue(0);
        dragon.setAccount(buyerAccount);

        return update(dragon);
    }

    @Override
    public Dragon breed(@NotNull Dragon ownedDragon, @NotNull Dragon siredDragon) {

        Account buyerAccount = ownedDragon.getAccount();
        buyerAccount.setBalance(buyerAccount.getBalance() - siredDragon.getSireValue());
        accountService.updateAccount(buyerAccount);

        Account siringAccount = siredDragon.getAccount();
        siringAccount.setBalance(siringAccount.getBalance() + siredDragon.getSireValue());
        accountService.updateAccount(siringAccount);

        Set<Trait> traits = new HashSet<>();

        for (Trait ownedTrait : ownedDragon.getTraits()) {
            for (Trait siredTrait : siredDragon.getTraits()) {
                if (ownedTrait.getTraitType().equals(siredTrait.getTraitType())) {
                    traits.add(getRandomBoolean() ? ownedTrait : siredTrait);
                }
            }
        }

        Dragon babyDragon = generateDragon(traits, buyerAccount);
        babyDragon.setNickname("A Happy Baby");
        return babyDragon;
    }

    @NotNull
    private Dragon generateDragon(Set<Trait> traits, Account account) {
        Dragon dragon = new Dragon();
        dragon.setGeneration(generationService.getCurrent());
        dragon.setTraits(traits);
        dragon.setAccount(account);

        return dragonRepository.save(dragon);
    }

    private boolean getRandomBoolean() {
        return Math.random() > 0.5;
    }

    private int getRandomIntInRange(int range) {
        return (int) (Math.random() * range);
    }
}
