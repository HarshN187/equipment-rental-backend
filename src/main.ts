import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionGlobalExceptionInterceptor } from './common/interceptors/exception-global-filter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ??
  app.useGlobalInterceptors(new ExceptionGlobalExceptionInterceptor());

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
