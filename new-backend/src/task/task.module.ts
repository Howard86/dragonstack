import { Module } from '@nestjs/common';

import { GenerationModule } from 'src/generation/generation.module';
import { TraitModule } from 'src/trait/trait.module';

import { TaskService } from './task.service';

@Module({
  imports: [TraitModule, GenerationModule],
  providers: [TaskService],
})
export class TaskModule {}
