export interface PaginationMeta {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
}

export interface PaginationResponse<T> {
    data: T[];
    meta: PaginationMeta;
}