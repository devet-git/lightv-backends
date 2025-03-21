import { Controller, Get } from '@nestjs/common';
import { LightvCoreService } from './lightv-core.service';

@Controller()
export class LightvCoreController {
  constructor(private readonly lightvCoreService: LightvCoreService) {}

  @Get()
  getHello(): string {
    return this.lightvCoreService.getHello();
  }
}
