package com.dragonstack.task;

import com.dragonstack.service.TraitService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class LoadTraits {

    @Bean
    CommandLineRunner initTraits(TraitService traitService) {
        return args -> {
            int traitCount = traitService.getTraitCount();
            
            if (traitCount > 0) {
                log.info("Trait table has already been preloaded with {} rows, continue...", traitCount);
            } else {
                traitService.createDefault();
                log.info("Preloading trait table completes");
            }
        };
    }
}
