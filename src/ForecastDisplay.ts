import { DisplayElement, IWeatherObserver } from "./interfaces";
import WeatherData from "./WeatherData";

export default class ForecastDisplay
  implements IWeatherObserver, DisplayElement
{
  observerName: string;
  private weatherData: WeatherData;
  private temperature: number;
  private pressure: number;
  private humidity: number;

  constructor(weatherData: WeatherData) {
    this.observerName = "Forecast Display";
    this.weatherData = weatherData;
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
    weatherData.subscribeObserver(this);
  }

  update(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display(): void {
    // console.log(
    //   `Temperature: ${this.temperature}\n Humidity: ${this.humidity}\n Pressure: ${this.pressure}`
    // );
  }
}
