import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 安全策略
  app.enableCors({
    origin:'*'
  });
  await app.listen(8888,'0.0.0.0');
}
bootstrap();
