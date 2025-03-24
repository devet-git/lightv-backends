import { Module } from '@nestjs/common';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';

@Module({
  providers: [],
  exports: [],
})
export class SharedModule {}
