export interface ForecastResponse {
    location: Location;
    forecast: ForecastClass;
}

export interface ForecastClass {
    days: Day[];
}

export interface Day {
    date:        Date;
    temperature: Temperature;
    condition:   DayCondition;
    hourly:      Hourly[];
}

export interface DayCondition {
    description: string;
    icon:        string;
    code:        number;
}

export interface Hourly {
    time:        string;
    temperature: Max;
    condition:   HourlyCondition;
    wind:        Wind;
    humidity:    number;
}

export interface HourlyCondition {
    description: string;
    icon:        string;
}

export interface Max {
    celsius:    number;
    fahrenheit: number;
}

export interface Wind {
    speedKph:  number;
    direction: string;
}

export interface Temperature {
    max: Max;
    min: Max;
}

export interface Location {
    city:      string;
    region:    string;
    country:   string;
    localTime: string;
}
