import { NestFactory } from '@nestjs/core';
import { LightvStudyModule } from './lightv-study.module';

async function bootstrap() {
  const app = await NestFactory.create(LightvStudyModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
