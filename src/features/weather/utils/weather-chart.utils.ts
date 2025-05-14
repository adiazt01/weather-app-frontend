import type { Forecast } from "../interface/forecast.interface";

export const transformHourlyChartData = (forecast: Forecast) => {
    const currentDate = new Date();
    return forecast.forecast.days[0].hourly
        .filter(hour => new Date(hour.time) > currentDate)
        .map(hour => {
            const date = new Date(hour.time);
            let h = date.getHours();
            const ampm = h >= 12 ? "p.m." : "a.m.";
            h = h % 12; h = h === 0 ? 12 : h;

            return {
                hour: `${h} ${ampm}`,
                temp: hour.temperature.celsius,
                icon: hour.condition.icon,
                time: date.getHours(),
            };
        })
        .slice(0, 8)
};