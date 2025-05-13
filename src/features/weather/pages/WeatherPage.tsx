import { CardWeatherHeader } from "../components/cards/CardWeatherHeader";
import { CardHourlyForecast } from "../components/cards/CardHourlyForecast";
import { CardDailyTemperature } from "../components/cards/CardDailyTemperature";
import { useWeather } from "../hooks/useWeather";
import { FloatingMenu } from "@/features/core/components/float-menu/FloatMenu";
import { useSearchParams } from "react-router";
import { AlertTriangle } from "lucide-react";

export const WeatherPage = () => {
    const [searchParams] = useSearchParams();
    const { currentWeather, forecast, isError, isFetching, isFetchingForecast } = useWeather(searchParams.get("city"));

    const hasCriticalError = isError

    if (hasCriticalError) {
        return (
            <div className="rounded-lg border bg-destructive/10 text-destructive p-6 flex flex-col items-center justify-center text-center gap-4 py-8">
                <div className="rounded-full bg-destructive/20 p-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                        Ocurrio un error!
                    </h3>
                    <p className="text-sm">
                        Ocurrio un error al obtener la información del clima. Por favor verifica que la ciudad sea correcta o intenta nuevamente más tarde.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-1 justify-center flex-col gap-6 p-6 mx-auto w-full max-w-screen-sm">
            <CardWeatherHeader currentWeather={currentWeather} isLoading={isFetching} />
            <CardHourlyForecast forecast={forecast} isLoading={isFetchingForecast} />
            <CardDailyTemperature currentWeather={currentWeather} forecast={forecast} isLoading={isFetching} />
        </div>
    )
}