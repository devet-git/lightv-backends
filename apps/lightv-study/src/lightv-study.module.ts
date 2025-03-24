import { Module } from '@nestjs/common';
import { LightvStudyController } from './lightv-study.controller';
import { LightvStudyService } from './lightv-study.service';
import { DatabaseModule } from '@database/database';
import { AuthModule } from '@auth/auth';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LightvStudyController],
  providers: [LightvStudyService],
})
export class LightvStudyModule {}
