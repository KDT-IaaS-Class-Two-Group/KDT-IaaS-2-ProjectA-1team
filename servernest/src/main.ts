import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 출처를 설정합니다.
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // 허용할 HTTP 메서드 설정
    allowedHeaders: 'Content-Type, Authorization', // 허용할 HTTP 헤더 설정
  });

  await app.listen(8000);
}
bootstrap();
