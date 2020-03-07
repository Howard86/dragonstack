import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TraitModule } from '../trait/trait.module';
import { GenerationModule } from '../generation/generation.module';

@Module({
  imports: [TraitModule, GenerationModule],
  providers: [TaskService],
})
export class TaskModule {}
