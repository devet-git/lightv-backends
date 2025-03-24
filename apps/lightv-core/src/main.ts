import { NestFactory } from '@nestjs/core';
import { LightvCoreModule } from './lightv-core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(LightvCoreModule);

  const config = new DocumentBuilder()
    .setTitle('LightV Core API')
    .setDescription('The LightV Core API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
