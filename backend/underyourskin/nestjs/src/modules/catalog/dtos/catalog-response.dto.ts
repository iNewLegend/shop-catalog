import {CatalogItemDTO} from "./catalog-item.dto";
import {CatalogPaginationDTO} from "./catalog-pagination.dto";

export class CatalogResponseDTO {
    result: CatalogItemDTO[];
    pagination: CatalogPaginationDTO;
}
