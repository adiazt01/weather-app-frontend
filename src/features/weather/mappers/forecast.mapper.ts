import type { Forecast } from "../interface/forecast.interface";
import type { ForecastResponse } from "../interface/responses/forecast-response.interface";

export const mapForecastResponseToForecast = (response: ForecastResponse): Forecast => {
    return {
        location: {
            city: response.location.city,
            region: response.location.region,
            country: response.location.country,
            localTime: response.location.localTime,
        },
        forecast: {
            days: response.forecast.days.map(day => ({
                date: day.date,
                temperature: {
                    max: {
                        celsius: day.temperature.max.celsius,
                        fahrenheit: day.temperature.max.fahrenheit,
                    },
                    min: {
                        celsius: day.temperature.min.celsius,
                        fahrenheit: day.temperature.min.fahrenheit,
                    },
                },
                condition: {
                    description: day.condition.description,
                    icon: day.condition.icon,
                    code: day.condition.code,
                },
                hourly: day.hourly.map(hour => ({
                    time: hour.time,
                    temperature: {
                        celsius: hour.temperature.celsius,
                        fahrenheit: hour.temperature.fahrenheit,
                    },
                    condition: {
                        description: hour.condition.description,
                        icon: hour.condition.icon,
                    },
                    wind: {
                        speedKph: hour.wind.speedKph,
                        direction: hour.wind.direction,
                    },
                    humidity: hour.humidity,
                })),
            })),
        },
    };
};