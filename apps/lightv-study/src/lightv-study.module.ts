import { Module } from '@nestjs/common';
import { LightvStudyController } from './lightv-study.controller';
import { LightvStudyService } from './lightv-study.service';

@Module({
  imports: [],
  controllers: [LightvStudyController],
  providers: [LightvStudyService],
})
export class LightvStudyModule {}
