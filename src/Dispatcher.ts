import { IRequestInterceptor } from "./interfaces";
import { RequestContext } from "./RequestContext";

export class Dispatcher {
  interceptors: IRequestInterceptor[] = [];

  addRequestInterceptor(interceptor: IRequestInterceptor) {
    console.log(`+ Adding interceptor - ${interceptor.interceptorName}`);
    this.interceptors.push(interceptor);
  }

  removeRequestInterceptor(interceptor: IRequestInterceptor) {
    const index = this.interceptors.indexOf(interceptor);

    if (index > -1) {
      this.interceptors.splice(index, 1);
      console.log(`- Removing interceptor ${interceptor}`);
    }
  }

  dispatchClientRequestInterceptor(context:RequestContext){
    for (const interceptor of this.interceptors) {
        interceptor.onRequest(context);
      }
  }
}
