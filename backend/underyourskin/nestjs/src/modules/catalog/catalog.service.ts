import {Injectable} from '@nestjs/common';
import {CatalogResponseDTO} from "./dtos/catalog-response.dto";
import {InjectRepository} from '@nestjs/typeorm';
import {Catalog} from '../../entity/catalog.entity';
import {getRepository, Repository} from 'typeorm';
import {CatalogPaginationDTO} from './dtos/catalog-pagination.dto';
import {CatalogItemDTO} from './dtos/catalog-item.dto';


@Injectable()
export class CatalogService {
    private static perPage = 8;


    constructor(
        @InjectRepository(Catalog)
        private catalogRepository: Repository<Catalog>
    ) {
    }


    async getPage(page = 0): Promise<CatalogResponseDTO> {
        const perPage = CatalogService.perPage,
            offset = page > 0 ? page * perPage : 0,

            count = await this.catalogRepository.count(),
            result = await getRepository(Catalog)
                .createQueryBuilder("catalog")
                .select(['id', 'name', 'price'])
                .offset(offset)
                .limit(perPage)
                .execute(),

            pagination: CatalogPaginationDTO = {
                current: page,
                total: count,
                pages: Math.ceil(count / perPage),
                perPage,
            }
        console.log(result);
        return {
            result,
            pagination
        };
    }

    async getItems(ids: number[]): Promise<CatalogItemDTO[]> {
        const result = await getRepository(Catalog)
            .createQueryBuilder("catalog")
            .select(['id', 'name', 'price'])
            .whereInIds(ids)
            .execute();

        return result;
    }
}
