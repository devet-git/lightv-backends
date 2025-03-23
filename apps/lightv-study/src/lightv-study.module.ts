import { Module } from '@nestjs/common';
import { LightvStudyController } from './lightv-study.controller';
import { LightvStudyService } from './lightv-study.service';
import { DatabaseModule } from '@database/database';

@Module({
  imports: [DatabaseModule],
  controllers: [LightvStudyController],
  providers: [LightvStudyService],
})
export class LightvStudyModule {}
