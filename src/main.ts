import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './common/config/envs';

/*
* link
* https://dashboard.stripe.com
* https://docs.stripe.com/libraries?lang=node
* https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
* Instalar Packetes
* - npm install stripe --save
* - https://dashboard.hookdeck.com/create-first-connection
* - npm install hookdeck-cli -g
*
*/

async function bootstrap() {

  const logger = new Logger('Payments-MS');
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  
  await app.listen(envs.PORT);

  logger.log(`Server Running On Port ${ envs.PORT }`);
}
bootstrap();
