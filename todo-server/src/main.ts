import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 安全策略
  app.enableCors({
    origin: '*', // Adjust the allowed origin as needed
    credentials: true, // Enable credentials if needed
  });
  await app.listen(8888);
}
bootstrap();
