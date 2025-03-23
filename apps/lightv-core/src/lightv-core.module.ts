import { Module } from '@nestjs/common';
import { LightvCoreController } from './lightv-core.controller';
import { LightvCoreService } from './lightv-core.service';
import { DatabaseModule } from '@database/database';

@Module({
  imports: [DatabaseModule],
  controllers: [LightvCoreController],
  providers: [LightvCoreService],
})
export class LightvCoreModule {}
