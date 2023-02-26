import { RequestContext } from "./RequestContext";

export interface IWeatherObserverable {
  subscribeObserver(weatherObserver: IWeatherObserver): void;
  unSubscribeObserver(weatherObserver: IWeatherObserver): void;
  notifyObservers(): void;
}

export interface IWeatherObserver {
  observerName: string;
  update(temp: number, humidity: number, pressure: number): void;
}

export interface DisplayElement {
  display(): void;
}

export interface IRequestInterceptor {
  interceptorName: string;
  onRequest(context: RequestContext): void;
}
