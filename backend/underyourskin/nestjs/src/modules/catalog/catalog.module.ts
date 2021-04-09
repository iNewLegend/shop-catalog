import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatalogService} from './catalog.service';
import {Catalog} from '../../entity/catalog.entity';
import {CatalogController} from './catalog.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Catalog])],
    providers: [CatalogService],
    controllers: [CatalogController],
})
export class CatalogModule {
}
