import { Dispatcher } from "./Dispatcher";
import { IWeatherObserver, IWeatherObserverable } from "./interfaces";
import { LoggerInterceptor } from "./LoggerInterceptor";
import { RequestContext } from "./RequestContext";

export default class WeatherData implements IWeatherObserverable {
  private weatherObservers: IWeatherObserver[] = [];
  private requestContext: RequestContext;
  private interceptorDispatcher: Dispatcher;
  private temperature: number;
  private pressure: number;
  private humidity: number;

  constructor(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.interceptorDispatcher = new Dispatcher();
    const loggingInterceptor = new LoggerInterceptor();

    this.interceptorDispatcher.addRequestInterceptor(loggingInterceptor);

    this.requestContext = new RequestContext(
      `Temperature: ${this.temperature}\n Humidity: ${this.humidity}\n Pressure: ${this.pressure}`
    );

    this.measurementsUpdated();
  }

  getTemperature(): number {
    return this.temperature;
  }

  getPressure(): number {
    return this.pressure;
  }

  getHumidity(): number {
    return this.humidity;
  }

  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementsUpdated();
  }

  measurementsUpdated(): void {
    this.interceptorDispatcher.dispatchClientRequestInterceptor(
      this.requestContext
    );

    this.notifyObservers();
  }

  subscribeObserver(weatherObserver: IWeatherObserver): void {
    this.weatherObservers.push(weatherObserver);
    // console.log(`+ Subscribing ${weatherObserver.observerName}`);
  }

  unSubscribeObserver(weatherObserver: IWeatherObserver): void {
    const index = this.weatherObservers.indexOf(weatherObserver);

    if (index > -1) {
      this.weatherObservers.splice(index, 1);
      // console.log(`- UnSubscribing ${weatherObserver}`);
    }
  }

  notifyObservers(): void {
    // console.log(`Notifying ${this.weatherObservers.length} observers!`);

    for (const observer of this.weatherObservers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }
}
