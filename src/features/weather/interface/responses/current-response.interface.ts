export interface CurrentResponse {
    location:       Location;
    currentWeather: CurrentWeather;
}

export interface CurrentWeather {
    temperature: FeelsLike;
    feelsLike:   FeelsLike;
    condition:   Condition;
    wind:        Wind;
    humidity:    number;
}

export interface Condition {
    description: string;
    icon:        string;
}

export interface FeelsLike {
    celsius:    number;
    fahrenheit: number;
}

export interface Wind {
    speedKph:  number;
    direction: string;
}

export interface Location {
    city:      string;
    region:    string;
    country:   string;
    localTime: string;
}
