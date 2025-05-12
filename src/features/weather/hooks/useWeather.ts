import { useQuery } from "@tanstack/react-query";
import type { Forecast } from "../interface/forecast.interface";
import { getCurrent, getForecast } from "../services/weather.service";
import type { CurrentWeather } from "../interface/current.interface";
import { getCurrentLocationFromIp } from "@/features/core/services/ip.service";
import type { IP } from "@/features/core/interfaces/ip.interface";

export const useWeather = (city: string | null) => {
    const { data: locationData, isError: isErrorLocation } = useQuery<IP, Error>({
        queryKey: ["location", city],
        queryFn: async () => {
            if (city) return {
                city: city,
            }

            const location = await getCurrentLocationFromIp();

            return location;
        },
        staleTime: 1000 * 60 * 60,
    });

    const { data: currentWeather, isFetching, isError } = useQuery<CurrentWeather, Error>({
        queryKey: ["current", locationData?.city],
        queryFn: async () => {
            if (!locationData?.city) throw new Error("City is not available");
            return await getCurrent({ city: locationData.city });
        },
        enabled: !!locationData?.city,
        staleTime: 1000 * 60 * 60,
    });

    const { data: forecast, isFetching: isFetchingForecast, isError: isErrorForecast } = useQuery<Forecast, Error>({
        queryKey: ["forecast", locationData?.city],
        queryFn: async () => {
            if (!locationData?.city) throw new Error("City is not available");
            return await getForecast({ city: locationData.city });
        },
        enabled: !!locationData?.city,
        staleTime: 1000 * 60 * 60,
    });
    
    return {
        currentWeather,
        forecast,
        locationData,
        isFetching,
        isFetchingForecast,
        isError,
        isErrorForecast,
        isErrorLocation
    };
}