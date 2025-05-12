export interface Forecast {
    location: {
        city: string;
        region: string;
        country: string;
        localTime: string;
    };
    forecast: {
        days: Array<{
            date: Date;
            temperature: {
                max: {
                    celsius: number;
                    fahrenheit: number;
                };
                min: {
                    celsius: number;
                    fahrenheit: number;
                };
            };
            condition: {
                description: string;
                icon: string;
                code: number;
            };
            hourly: Array<{
                time: string;
                temperature: {
                    celsius: number;
                    fahrenheit: number;
                };
                condition: {
                    description: string;
                    icon: string;
                };
                wind: {
                    speedKph: number;
                    direction: string;
                };
                humidity: number;
            }>;
        }>;
    };
}