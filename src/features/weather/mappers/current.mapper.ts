import type { CurrentWeather } from "../interface/current.interface";
import type { CurrentResponse } from "../interface/responses/current-response.interface";

export const mapCurrentResponseToCurrent = (currentResponse:CurrentResponse) : CurrentWeather => {
    return {
        location: {
            city: currentResponse.location.city,
            country: currentResponse.location.country,
            localTime: currentResponse.location.localTime,
            region: currentResponse.location.region
        },
        weather: {
            condition: {
                description: currentResponse.currentWeather.condition.description,
                icon: currentResponse.currentWeather.condition.icon,
            },
            feelsLike: {
                celsius: currentResponse.currentWeather.feelsLike.celsius,
                fahrenheit: currentResponse.currentWeather.feelsLike.fahrenheit
            },
            temperature: {
                celsius: currentResponse.currentWeather.temperature.celsius,
                fahrenheit: currentResponse.currentWeather.temperature.fahrenheit
            },
            wind: {
                speedKph: currentResponse.currentWeather.wind.speedKph,
                direction: currentResponse.currentWeather.wind.direction   
            },
            humidity: currentResponse.currentWeather.humidity,
        }
    }
}