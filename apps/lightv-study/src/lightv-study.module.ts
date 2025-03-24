import { Module } from '@nestjs/common';
import { LightvStudyController } from './lightv-study.controller';
import { LightvStudyService } from './lightv-study.service';
import { DatabaseModule } from '@database/database';
import { AuthModule } from '@auth/auth';
import { SharedModule } from '@shared/shared';

@Module({
  imports: [DatabaseModule, AuthModule, SharedModule],
  controllers: [LightvStudyController],
  providers: [LightvStudyService],
})
export class LightvStudyModule {}
