import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HourlyChartLine } from "../charts/HourlyChartLine";
import type { CurrentWeather } from "../../interface/current.interface";
import type { Forecast } from "../../interface/forecast.interface";
import { Thermometer } from "lucide-react";

interface CardDailyTemperatureCardProps {
    currentWeather: CurrentWeather | undefined;
    forecast: Forecast | undefined;
    isLoading: boolean;
}

export const CardDailyTemperature = ({ currentWeather, forecast, isLoading }: CardDailyTemperatureCardProps) => {

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-medium">
                        <Skeleton className="w-40 h-5" />
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        <Skeleton className="w-40 h-5" />
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[200px]">
                    <Skeleton className="w-full h-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-violet-950 font-medium">
                    Temperatura durante el día
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
                {!isLoading && forecast?.forecast.days[0]?.hourly && <HourlyChartLine forecast={forecast} />}
            </CardContent>
        </Card>
    );
};
