package com.dragonstack.task;

import com.dragonstack.model.entity.Generation;
import com.dragonstack.service.GenerationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@AllArgsConstructor
public class GenerationEngine {
    
    private final GenerationService generationService;

    //    TODO: use dynamic rate
    @Scheduled(fixedRate = 5 * 60 * 1000)
    public void start() {
        Generation currentGeneration = generationService.create();
        log.info(
                "Current generation ID is {} with expiration {}",
                currentGeneration.getId(),
                currentGeneration.getExpiration()
        );
    }
}
