import { Controller, Get } from '@nestjs/common';
import { LightvStudyService } from './lightv-study.service';

@Controller()
export class LightvStudyController {
  constructor(private readonly lightvStudyService: LightvStudyService) {}

  @Get()
  getHello(): string {
    return this.lightvStudyService.getHello();
  }
}
