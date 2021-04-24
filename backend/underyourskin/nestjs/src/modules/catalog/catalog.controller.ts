import { Controller, Get, Param, Query } from "@nestjs/common";
import { CatalogResponseDTO } from "./dtos/catalog-response.dto";
import { CatalogService } from "./catalog.service";
import { CatalogItemDTO } from "./dtos/catalog-item.dto";


@Controller( 'catalog' )
export class CatalogController {

    constructor( private readonly catalogService: CatalogService ) {
    }

    @Get( 'index/:id?' )
    getPage( @Param( 'id' ) id = 0 ): Promise<CatalogResponseDTO> {
        return this.catalogService.getPage( +id );
    }

    @Get( 'get/:ids' )
    getItems( @Param( 'ids' ) ids: string ): Promise<CatalogItemDTO[]> {
        return this.catalogService.getItems( ids.split( ',' ).map( id => Number( id ))  );
    }
}
