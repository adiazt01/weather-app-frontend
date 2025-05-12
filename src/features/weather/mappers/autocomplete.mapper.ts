import type { AutoComplete } from "../interface/autocomplete.interface";
import type { AutoCompleteResponse } from "../interface/responses/autocomplete-response.interface";

export const mapAutoCompleteResponseToCities = (data: AutoCompleteResponse): AutoComplete => {
    return {
        country: data.country,
        id: data.id,
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        region: data.region,
    }
};