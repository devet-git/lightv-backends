import { Module } from '@nestjs/common';
import { LightvCoreController } from './lightv-core.controller';
import { LightvCoreService } from './lightv-core.service';

@Module({
  imports: [],
  controllers: [LightvCoreController],
  providers: [LightvCoreService],
})
export class LightvCoreModule {}
