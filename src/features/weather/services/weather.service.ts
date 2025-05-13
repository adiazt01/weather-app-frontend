import http from "@/config/http"
import { mapResponseError } from "@/features/shared/mappers/errors.mappers"
import { mapCurrentResponseToCurrent } from "../mappers/current.mapper"
import type { CurrentResponse } from "../interface/responses/current-response.interface"
import type { Forecast } from "../interface/forecast.interface"
import { mapForecastResponseToForecast } from "../mappers/forecast.mapper"
import type { ForecastResponse } from "../interface/responses/forecast-response.interface"
import type { CurrentWeather } from "../interface/current.interface"
import type { AutoCompleteResponse } from "../interface/responses/autocomplete-response.interface"
import { mapAutoCompleteResponseToCities } from "../mappers/autocomplete.mapper"
import type { AutoComplete } from "../interface/autocomplete.interface"

export const getCurrent = async ({ city }: { city: string }): Promise<CurrentWeather> =>  {
    try {
        const response = await http.get<CurrentResponse>(`/weather?city=${city}`)

        return mapCurrentResponseToCurrent(response.data)
    } catch (error) {
        throw mapResponseError(error)
    }
}

export const getForecast = async ({ city }: { city: string}): Promise<Forecast> => {
        try {
            const response = await http.get<ForecastResponse>(`/weather/forecast?city=${city}`)

            return mapForecastResponseToForecast(response.data)
        } catch (error) {
            throw mapResponseError(error)
        }
}

export const getAutoComplete = async ({ city }: { city: string }): Promise<AutoComplete> => {
    try {
        const response = await http.get<AutoCompleteResponse>(`/weather/autocomplete?city=${city}`)
        return mapAutoCompleteResponseToCities(response.data)
    } catch (error) {
        throw mapResponseError(error)
    }
}