import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CatalogModule } from './modules/catalog/catalog.module';
import { Catalog } from './entity/catalog/catalog.entity';
import { CartModule } from './modules/cart/cart.module';
import { Connection } from "typeorm";

@Module( {
    imports: [ CatalogModule, CartModule, TypeOrmModule.forRoot(
        {
            ...require( '../config/database.json' ),
            "entities": [ Catalog ]
        } ) ],
    controllers: [],
    providers: [ AppService, ],
} )

export class AppModule {
    constructor( private connection: Connection ) {
        setTimeout( async () => {
            const catalog = this.connection.getRepository( Catalog.name );

            if ( await catalog.count() === 0 ) {
                await catalog.insert( await import( './entity/catalog/mock.json' ) );
            }
        } );
    }

}
