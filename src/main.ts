import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtMiddleware } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3000;
  // app.use(JwtMiddleware); // for functional component
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
