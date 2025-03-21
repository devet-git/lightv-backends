import { Injectable } from '@nestjs/common';

@Injectable()
export class LightvCoreService {
  getHello(): string {
    return 'Hello World! core 1';
  }
}
