import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { TypenameInterceptor } from '@access-control/infrastructure/adapters/primary/interceptors/typename.interceptor';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('========= BACKEND IBD =========')
  const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el dto
      forbidNonWhitelisted: false, // lanza error si hay propiedades extra
      transform: true, // conversión de tipos
      transformOptions: { enableImplicitConversion: true },
    })
  );

  app.useGlobalInterceptors(new TypenameInterceptor());
    app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '',
        method: RequestMethod.GET
      }
    ]
  })
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ALTA DEMANDA DOCUMENTATION APIS')
    .setDescription('Documentación para las APIS de Alta Demanda')
    .setVersion('1.0')


  await app.listen(process.env.PORT ?? 3000);
  logger.log(`💪 App Corriendo en el puerto ${process.env.PORT}`)
}
bootstrap();
