import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Forecast } from "../../interface/forecast.interface";

interface HourlyForecastProps {
    forecast: Forecast | undefined;
    isLoading: boolean;
}

export const CardHourlyForecast = ({ forecast, isLoading }: HourlyForecastProps) => {
    if (isLoading || !forecast) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <Skeleton className="w-40 h-6" />
                </CardHeader>
                <CardContent className="px-4">
                    <div className="grid grid-cols-8 gap-2">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1 py-2">
                                <Skeleton className="w-12 h-4" />
                                <Skeleton className="w-9 h-9 my-1" />
                                <Skeleton className="w-8 h-4" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!forecast?.forecast?.days[0]?.hourly) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-center text-lg font-medium text-red-500">
                        No hay datos disponibles
                    </CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">Pronóstico por horas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row flex-wrap justify-center sm:justify-between w-full gap-2">
                    {forecast.forecast.days[0].hourly
                        .filter((_, index) => index % 3 === 0)
                        .slice(0, 8)
                        .map((hour, idx) => {
                            const date = new Date(hour.time);
                            let h = date.getHours();
                            const ampm = h >= 12 ? "PM" : "AM";
                            h = h % 12;
                            h = h === 0 ? 12 : h;
                            const hourLabel = `${h} ${ampm}`;

                            return (
                                <div key={idx} className="flex flex-col items-center gap-1 py-2">
                                    <span className="text-xs text-muted-foreground">{hourLabel}</span>
                                    <img
                                        src={hour.condition.icon || "/placeholder.svg"}
                                        alt={hour.condition.description}
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 my-1"
                                    />
                                    <span className="text-sm font-medium">{Math.round(hour.temperature.celsius)}°</span>
                                </div>
                            );
                        })}
                </div>
            </CardContent>
        </Card>
    );
};