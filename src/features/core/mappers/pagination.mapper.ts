import type { PaginationResponse } from "../interfaces/responses/pagination-response.interface";

export const mapPaginationResponse = <T, U>(
    response: PaginationResponse<T>,
    mapItem: (item: T) => U
): PaginationResponse<U> => {
    return {
        data: response.data.map(mapItem),
        meta: response.meta,
    };
};