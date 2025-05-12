import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CurrentWeather } from "../../interface/current.interface"
import { Skeleton } from "@/components/ui/skeleton"

export interface CardWeatherHeaderProps {
    currentWeather: CurrentWeather | undefined,
    isLoading: boolean,
}

export const CardWeatherHeader = ({ currentWeather, isLoading }: CardWeatherHeaderProps) => {
    if (!currentWeather || isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="mx-auto w-32 h-7" />
                    <Skeleton className="mx-auto w-24 h-5 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="mx-auto w-32 h-16 mt-2" />
                    <Skeleton className="w-28 h-5 mt-2" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="gap-0">
                <CardTitle className="text-center text-lg font-medium">
                    {currentWeather.location.city}, {currentWeather.location.country}
                </CardTitle>
                <CardDescription>
                    <div className="text-center text-muted-foreground text-lg font-semibold">
                        {new Date().toLocaleDateString("es-ES", { weekday: "long", month: "long", day: "numeric" })}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-6xl font-medium tracking-tight">
                                {currentWeather.weather.temperature.celsius}°
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {currentWeather.weather.condition.description}
                            </span>
                        </div>
                        <img
                            src={currentWeather.weather.condition.icon}
                            alt={currentWeather.weather.condition.description}
                            width={64}
                            height={64}
                            className="h-16 w-16"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};