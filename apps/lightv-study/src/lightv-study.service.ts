import { Injectable } from '@nestjs/common';

@Injectable()
export class LightvStudyService {
  getHello(): string {
    return 'Hello World! study';
  }
}
