const Generation = require('.');

class GenerationEngine {
  constructor() {
    this.generation = null;
    this.timer = null;
  }

  start() {
    this.buildGeneration();
  }

  stop() {
    clearTimeout(this.timer);
  }

  buildGeneration() {
    this.generation = new Generation();

    console.log('new generation', this.generation);

    this.timer = setTimeout(
      () => this.buildGeneration(),
      this.generation.expiration.getTime() - Date.now(),
    );
  }
}

module.exports = GenerationEngine;
