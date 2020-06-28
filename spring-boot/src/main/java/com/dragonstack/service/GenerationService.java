package com.dragonstack.service;

import com.dragonstack.model.entity.Generation;

public interface GenerationService {

    Generation getCurrent();

    Generation create();
}
