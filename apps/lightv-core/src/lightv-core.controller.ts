import { Controller, Get, UseGuards } from '@nestjs/common';
import { LightvCoreService } from './lightv-core.service';
import { JwtAuthGuard } from '@auth/auth/guards/jwt.guard';

@Controller()
export class LightvCoreController {
  constructor(private readonly lightvCoreService: LightvCoreService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.lightvCoreService.getHello();
  }
}
