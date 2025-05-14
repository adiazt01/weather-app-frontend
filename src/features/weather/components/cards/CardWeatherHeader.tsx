import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CurrentWeather } from "../../interface/current.interface"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatePresence, motion } from "motion/react"
export interface CardWeatherHeaderProps {
    currentWeather: CurrentWeather | undefined,
    isLoading: boolean,
}

export const CardWeatherHeader = ({ currentWeather, isLoading }: CardWeatherHeaderProps) => {
    if (!currentWeather || isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="mx-auto w-32 h-7" role="status" />
                    <Skeleton className="mx-auto w-24 h-5 mt-2" role="status" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="mx-auto w-32 h-16 mt-2" role="status" />
                    <Skeleton className="w-28 h-5 mt-2" role="status" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="gap-0.5">
                <CardTitle className="text-center text-xl text-violet-950 font-medium">
                    {currentWeather.location.city}, {currentWeather.location.country}
                </CardTitle>
                <CardDescription>
                    <div className="text-center text-violet-950/80 text-lg font-medium">
                        {new Date().toLocaleDateString("es-ES", { weekday: "long", month: "long", day: "numeric" })}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-6xl text-violet-950 font-medium tracking-tight">
                                {currentWeather.weather.temperature.celsius}°
                            </h2>
                        </div>
                        <AnimatePresence>
                            {currentWeather.weather.condition.icon && <motion.img key="modal" exit={{ opacity: 0, scale: 0 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                                src={currentWeather.weather.condition.icon}
                                alt={currentWeather.weather.condition.description}
                                width={70}
                                height={70}
                                
                            />}
                        </AnimatePresence>

                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-violet-950/80">Viento</span>
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-violet-950"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 15h11.25a3.75 3.75 0 100-7.5H9"
                                />
                            </svg>
                            <span className="text-lg text-violet-950 font-medium">
                                {currentWeather.weather.wind.speedKph} km/h
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-violet-950/80">Humedad</span>
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-violet-950"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v18m0 0a9 9 9 0 100-18 9 9 0 000 18z"
                                />
                            </svg>
                            <span className="text-lg text-violet-950 font-medium">
                                {currentWeather.weather.humidity}%
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};