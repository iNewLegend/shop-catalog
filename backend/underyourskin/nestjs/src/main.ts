import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

import * as CookieParser from 'cookie-parser';


async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:8080',
        credentials: true,
    });

    app.use(CookieParser());

    await app.listen(3000);
}

bootstrap();
