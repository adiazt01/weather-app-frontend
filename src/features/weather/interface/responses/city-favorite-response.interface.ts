export interface CreateCityFavoriteResponse {
    createdAt: Date;
    updatedAt: Date;
    id:        string;
    name:      string;
    region:    string;
    country:   string;
    latitude: number;
    longitude: number;
    user:      User;
}

export interface FindAllCityFavoriteResponse {
    createdAt: Date;
    updatedAt: Date;
    id:        string;
    name:      string;
    region:    string;
    country:   string;
    latitude: number;
    longitude: number;
}

export interface FindOneCityFavoriteResponse {
    createdAt: Date;
    updatedAt: Date;
    id:        string;
    name:      string;
    region:    string;
    country:   string;
    latitude: number;
    longitude: number;
}

export interface User {
    id: number;
}
