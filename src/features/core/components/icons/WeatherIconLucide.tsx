import * as LucideIcons from "lucide-react";
import React from "react";

// Mapeo de códigos WeatherAPI a nombres de iconos Lucide
const weatherCodeToLucideIcon: Record<number, string> = {
  1000: "Sun", // Sunny
  1003: "CloudSun", // Partly cloudy
  1006: "Cloud", // Cloudy
  1009: "Cloud", // Overcast
  1030: "CloudFog", // Mist
  1063: "CloudDrizzle", // Patchy rain possible
  1066: "CloudSnow", // Patchy snow possible
  1069: "CloudSleet", // Patchy sleet possible
  1072: "CloudDrizzle", // Patchy freezing drizzle possible
  1087: "CloudLightning", // Thundery outbreaks possible
  1114: "CloudSnow", // Blowing snow
  1117: "CloudSnow", // Blizzard
  1135: "CloudFog", // Fog
  1147: "CloudFog", // Freezing fog
  1150: "CloudDrizzle", // Patchy light drizzle
  1153: "CloudDrizzle", // Light drizzle
  1168: "CloudDrizzle", // Freezing drizzle
  1171: "CloudDrizzle", // Heavy freezing drizzle
  1180: "CloudRain", // Patchy light rain
  1183: "CloudRain", // Light rain
  1186: "CloudRain", // Moderate rain at times
  1189: "CloudRain", // Moderate rain
  1192: "CloudRain", // Heavy rain at times
  1195: "CloudRain", // Heavy rain
  1198: "CloudRain", // Light freezing rain
  1201: "CloudRain", // Moderate or heavy freezing rain
  1204: "CloudSleet", // Light sleet
  1207: "CloudSleet", // Moderate or heavy sleet
  1210: "CloudSnow", // Patchy light snow
  1213: "CloudSnow", // Light snow
  1216: "CloudSnow", // Patchy moderate snow
  1219: "CloudSnow", // Moderate snow
  1222: "CloudSnow", // Patchy heavy snow
  1225: "CloudSnow", // Heavy snow
  1237: "CloudHail", // Ice pellets
  1240: "CloudRain", // Light rain shower
  1243: "CloudRain", // Moderate or heavy rain shower
  1246: "CloudRain", // Torrential rain shower
  1249: "CloudSleet", // Light sleet showers
  1252: "CloudSleet", // Moderate or heavy sleet showers
  1255: "CloudSnow", // Light snow showers
  1258: "CloudSnow", // Moderate or heavy snow showers
  1261: "CloudHail", // Light showers of ice pellets
  1264: "CloudHail", // Moderate or heavy showers of ice pellets
  1273: "CloudLightningRain", // Patchy light rain with thunder
  1276: "CloudLightningRain", // Moderate or heavy rain with thunder
  1279: "CloudLightningSnow", // Patchy light snow with thunder
  1282: "CloudLightningSnow", // Moderate or heavy snow with thunder
};

interface WeatherIconLucideProps {
  code: number;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export const WeatherIconLucide: React.FC<WeatherIconLucideProps> = ({
  code,
  size = 80,
  className = "",
  strokeWidth = 1.5,
}) => {
  const iconName = weatherCodeToLucideIcon[code] || "Cloud";
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};
