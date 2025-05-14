import { render, screen } from "@testing-library/react";
import { CardWeatherHeader, type CardWeatherHeaderProps,  } from "./CardWeatherHeader";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("CardWeatherHeader", () => {
    const mockWeather: CardWeatherHeaderProps["currentWeather"] = {
        location: { city: "Madrid", region: "Community of Madrid", country: "Spain", localTime: "2023-03-15T10:00:00Z" },
        weather: {
            temperature: { celsius: 25, fahrenheit: 77 },
            feelsLike: { celsius: 27, fahrenheit: 80 },
            condition: { icon: "icon-url", description: "Sunny" },
            wind: { speedKph: 15, direction: "NE" },
            humidity: 60,
        },
    };

    it("renders skeletons when loading", () => {
        render(<CardWeatherHeader currentWeather={undefined} isLoading={true} />);
        expect(screen.getAllByRole("status")).toHaveLength(4);
    });

    it("renders weather details when data is available", () => {
        render(<CardWeatherHeader currentWeather={mockWeather} isLoading={false} />);
        expect(screen.getByText("Madrid, Spain")).toBeInTheDocument();
        expect(screen.getByText("25°")).toBeInTheDocument();
        expect(screen.getByAltText("Sunny")).toBeInTheDocument();
        expect(screen.getByText("15 km/h")).toBeInTheDocument();
        expect(screen.getByText("60%")).toBeInTheDocument();
    });

    it("does not render weather details when loading", () => {
        render(<CardWeatherHeader currentWeather={mockWeather} isLoading={true} />);
        expect(screen.queryByText("Madrid, Spain")).not.toBeInTheDocument();
        expect(screen.queryByText("25°")).not.toBeInTheDocument();
    });

    it("handles missing weather icon gracefully", () => {
        const weatherWithoutIcon = {
            ...mockWeather,
            weather: { ...mockWeather.weather, condition: { icon: null, description: "Sunny" } },
        };
        render(<CardWeatherHeader currentWeather={weatherWithoutIcon} isLoading={false} />);
        expect(screen.queryByAltText("Sunny")).not.toBeInTheDocument();
    });
});