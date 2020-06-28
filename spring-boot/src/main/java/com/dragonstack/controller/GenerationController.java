package com.dragonstack.controller;

import com.dragonstack.model.entity.Generation;
import com.dragonstack.service.GenerationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "generations")
@AllArgsConstructor
public class GenerationController {

    private final GenerationService generationService;

    @GetMapping
    public ResponseEntity<Generation> getCurrentGeneration() {
        return new ResponseEntity<>(generationService.getCurrent(), HttpStatus.OK);
    }
}
