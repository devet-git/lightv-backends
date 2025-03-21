import { NestFactory } from '@nestjs/core';
import { LightvCoreModule } from './lightv-core.module';

async function bootstrap() {
  const app = await NestFactory.create(LightvCoreModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
