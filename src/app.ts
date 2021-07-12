import { NestFactory } from '@nestjs/core';
import {  NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(3000, 'localhost', () =>
   console.log(`App is running`)
  );
}

bootstrap();

/*app.use('/api/v1', routerV1api);
app.use('/api/authorize', authorizeApi);
app.use('/api/comments', commentsApi);
app.use('/', shortLinksRouter);*/
