import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionGlobalExceptionInterceptor } from './common/interceptors/exception-global-filter.interceptor';
import { AuthGuard } from './common/guards/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ??
  // app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.useGlobalInterceptors(new ExceptionGlobalExceptionInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Assessment Api')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
