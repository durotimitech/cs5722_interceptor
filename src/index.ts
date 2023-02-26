import ForecastDisplay from "./ForecastDisplay";
import WeatherData from "./WeatherData";

const weatherData = new WeatherData(10, 20, 30);
new ForecastDisplay(weatherData);

weatherData.setMeasurements(20, 3, 34);
weatherData.setMeasurements(19, 56, 42);
