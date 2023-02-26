import { IRequestInterceptor } from "./interfaces";
import { RequestContext } from "./RequestContext";

export class LoggerInterceptor implements IRequestInterceptor {
  interceptorName: string;

  constructor() {
    this.interceptorName = "Logging Interceptor";
  }

  onRequest(context: RequestContext): void {
    console.log("Request Intercepted. Logging...\n");
    console.log(`Temp Data: ${context.getTempData()}\n\n**************\n\n`);
  }
}
