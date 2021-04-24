import { NestFactory } from '@nestjs/core';
import { Connection } from 'typeorm';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';

async function ensure_database() {
    const databaseConfig = require( '../config/database.json' ),
        database = databaseConfig.database;

    delete databaseConfig.database;

    const connection = new Connection( databaseConfig );
    await connection.connect();
    await connection.query( `CREATE DATABASE IF NOT EXISTS ${ database }`);
 }

async function bootstrap() {
    await ensure_database();

    const app = await NestFactory.create( AppModule ),
        appConfig = require( '../config/app.json' );

    app.enableCors( appConfig.cors );

    app.use( CookieParser() );

    await app.listen( appConfig.port );
}

bootstrap();
