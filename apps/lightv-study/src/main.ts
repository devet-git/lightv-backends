import { NestFactory } from '@nestjs/core';
import { LightvStudyModule } from './lightv-study.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(LightvStudyModule);

  const config = new DocumentBuilder()
    .setTitle('LightV Study API')
    .setDescription('The LightV Study API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
