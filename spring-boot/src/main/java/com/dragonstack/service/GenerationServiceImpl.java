package com.dragonstack.service;

import com.dragonstack.model.entity.Generation;
import com.dragonstack.persistance.GenerationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class GenerationServiceImpl implements GenerationService {

    private final GenerationRepository generationRepository;
    //    TODO: Probably don't need ArrayList
    private final ArrayList<Generation> generationArrayList = new ArrayList<>();

    @Override
    public Generation getCurrent() {
        if (generationArrayList.size() == 0) {
// TODO: add sorting strategy
            List<Generation> generations = generationRepository.findAll();
            generationArrayList.add(generations.get(generations.size() - 1));
        }
        int currentPosition = generationArrayList.size() - 1;
        return generationArrayList.get(currentPosition);
    }

    @Override
    public Generation create() {
        Generation generation = new Generation();
        generationArrayList.add(generation);
        generationRepository.save(generation);
        return generation;
    }
}
