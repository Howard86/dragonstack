package com.dragonstack.service;

import com.dragonstack.model.entity.Generation;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface GenerationService {

    Generation getCurrent();

    Generation create();
}
