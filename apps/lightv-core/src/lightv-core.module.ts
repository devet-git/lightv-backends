import { Module } from '@nestjs/common';
import { LightvCoreController } from './lightv-core.controller';
import { LightvCoreService } from './lightv-core.service';
import { DatabaseModule } from '@database/database';
import { AuthModule } from '@auth/auth';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LightvCoreController],
  providers: [LightvCoreService],
})
export class LightvCoreModule {}
