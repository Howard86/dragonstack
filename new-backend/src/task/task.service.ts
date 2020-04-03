import { Injectable, Logger } from '@nestjs/common';
import { Timeout, SchedulerRegistry } from '@nestjs/schedule';

import { GenerationEngineService } from 'src/generation/generation-engine.service';
import { TraitService } from 'src/trait/trait.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly traitService: TraitService,
    private readonly generationEngineService: GenerationEngineService,
  ) {}

  @Timeout(1000)
  async handleInitTraitTable(): Promise<void> {
    const traitCounts = await this.traitService.count();
    if (traitCounts == 0) {
      this.traitService.init();
      this.logger.debug('Finished trait initialization');
    } else {
      this.logger.debug(`Found ${traitCounts} traits, skip initialization`);
    }
  }

  @Timeout(1001)
  async startEngine() {
    await this.handleEngineGeneration();
  }

  async handleEngineGeneration() {
    await this.generationEngineService.buildGeneration();
    const timer = this.generationEngineService.timer;
    const { id, expiration } = this.generationEngineService.generation;
    this.logger.warn(`ID ${id} generation expires at ${expiration}`);

    const name = 'start engine';
    const callback = () => {
      this.schedulerRegistry.deleteTimeout(name);
      this.handleEngineGeneration();
    };
    const timeout = setTimeout(callback, timer);
    this.schedulerRegistry.addTimeout(name, timeout);
  }
}
