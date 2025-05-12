import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart, CartesianGrid } from "recharts";
import { Tooltip } from "@/components/ui/tooltip";
import { HourTick } from "./hour-tick/HourTick";
import { transformHourlyChartData } from "../../utils/weather-chart.utils";
import type { Forecast } from "../../interface/forecast.interface";

interface HourlyChartLineProps {
    forecast: Forecast;
}

export const HourlyChartLine = ({ forecast }: HourlyChartLineProps) => {
    const hourlyChartData = transformHourlyChartData(forecast);

    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyChartData} margin={{ top: 20, right: 30, left: 25, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={<HourTick data={hourlyChartData} x={0} y={0} payload={undefined} />} interval={0} />
                <YAxis hide domain={['dataMin - 2', 'dataMax + 3']} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#f59e0b"
                    fill="url(#yellowGradient)"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', r: 4 }}
                    label={{ position: 'top', fill: '#f59e0b', fontSize: 12 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};