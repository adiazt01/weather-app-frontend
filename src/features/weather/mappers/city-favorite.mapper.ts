import type { CreateCityFavoriteResponse, FindAllCityFavoriteResponse, FindOneCityFavoriteResponse } from "../interface/responses/city-favorite-response.interface";
import type { CityFavorite } from "../interface/city-favorite.interface";
import { mapPaginationResponse } from '../../core/mappers/pagination.mapper';
import type { PaginationResponse } from "@/features/core/interfaces/responses/pagination-response.interface";

export const mapCreateCityFavoriteResponseToCityFavorite = (
  response: CreateCityFavoriteResponse
): CityFavorite => {
  return {
    id: response.id,
    name: response.name,
    region: response.region,
    country: response.country,
    latitude: response.latitude,
    longitude: response.longitude,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};

export const mapFindOneCityFavoriteResponseToCityFavorite = (
  response: FindOneCityFavoriteResponse
): CityFavorite => {
  return {
    id: response.id,
    name: response.name,
    region: response.region,
    country: response.country,
    latitude: response.latitude,
    longitude: response.longitude,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};

export const mapCityFavoritesPagination = (
  response: PaginationResponse<FindAllCityFavoriteResponse>
): PaginationResponse<CityFavorite> => {
  return mapPaginationResponse(response, (item) => ({
    id: item.id,
    name: item.name,
    region: item.region,
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
};