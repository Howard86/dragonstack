const Generation = require('.');
const GenerationTable = require('./table');
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
    const generation = new Generation();

    GenerationTable.storeGeneration(generation)
      .then(({ generationId }) => {
        this.generation = generation;
        this.generation.generationId = generationId;

        console.log('new generation', this.generation);

        this.timer = setTimeout(
          () => this.buildGeneration(),
          this.generation.expiration.getTime() - Date.now(),
        );
      })
      .catch(error => console.error(error));
  }
}

module.exports = GenerationEngine;
