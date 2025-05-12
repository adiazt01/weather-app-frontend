import http from "@/config/http"
import type { CityFavorite } from "../interface/city-favorite.interface"
import type { CreateCityFavoriteResponse, FindAllCityFavoriteResponse, FindOneCityFavoriteResponse } from "../interface/responses/city-favorite-response.interface"
import type { CityFavoriteSchema } from "../schemas/city-favorites.schema"
import { mapCityFavoritesPagination, mapCreateCityFavoriteResponseToCityFavorite, mapFindOneCityFavoriteResponseToCityFavorite } from "../mappers/city-favorite.mapper"
import { mapResponseError } from "@/features/shared/mappers/errors.mappers"
import type { PaginationResponse } from "@/features/core/interfaces/responses/pagination-response.interface"

export const addCityFavorite = async ({
    cityFavorite,
}: { cityFavorite: CityFavoriteSchema }): Promise<CityFavorite> => {
    try {
        const response = await http.post<CreateCityFavoriteResponse>('/favorites', cityFavorite)

        return mapCreateCityFavoriteResponseToCityFavorite(response.data)
    } catch (error) {
        throw mapResponseError(error)
    }
}

export const getCitiesFavorites = async (): Promise<PaginationResponse<CityFavorite>> => {
    try {
        const response = await http.get<PaginationResponse<FindAllCityFavoriteResponse>>('/favorites')

        return mapCityFavoritesPagination(response.data)
    } catch (error) {
        throw mapResponseError(error)
    }
}

export const getCityFavoriteById = async (id: string): Promise<CityFavorite> => {
    try {
        const response = await http.get<FindOneCityFavoriteResponse>(`/favorites/${id}`)

        return mapFindOneCityFavoriteResponseToCityFavorite(response.data)
    } catch (error) {
        throw mapResponseError(error)
    }
}

export const removeCityFavorite = async (id: number): Promise<void> => {
    try {
        await http.delete(`/favorites/${id}`);
    } catch (error) {
        throw mapResponseError(error)
    }
}