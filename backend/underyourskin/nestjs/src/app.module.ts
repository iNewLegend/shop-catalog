import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppService} from './app.service';
import {Connection} from 'typeorm';
import {CatalogModule} from './modules/catalog/catalog.module';
import {Catalog} from './entity/catalog.entity';
import {CartModule} from './modules/cart/cart.module';

@Module({
    imports: [CatalogModule, CartModule, TypeOrmModule.forRoot(
        {
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "1234",
            "database": "shop-catalog",
            "synchronize": true,
            "logging": true,
            "entities": [Catalog]
        })],
    controllers: [],
    providers: [AppService,],
})

export class AppModule {
    constructor(private connection: Connection) {
    }

}
