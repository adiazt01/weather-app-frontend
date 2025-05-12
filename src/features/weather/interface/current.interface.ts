export interface CurrentWeather {
    location: {
        city:      string;
        region:    string;
        country:   string;
        localTime: string;
    },
    weather: {
        temperature: {
            celsius: number,
            fahrenheit: number,
        },
        feelsLike: {
            celsius: number,
            fahrenheit: number,
        },
        condition: {
            description: string,
            icon: string,
        },
        wind: {
            speedKph: number,
            direction: string
        },
        humidity: number,
    }
}