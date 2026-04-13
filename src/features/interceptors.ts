import { RequestConfig } from "../core/client";

type RequestInterceptor = (config: RequestConfig) => RequestConfig;
type ResponseInterceptor = (response: any) => any;

export class InterceptorManager {
  request: RequestInterceptor[] = [];
  response: ResponseInterceptor[] = [];

  useRequest(fn: RequestInterceptor) {
    this.request.push(fn);
  }

  useResponse(fn: ResponseInterceptor) {
    this.response.push(fn);
  }
}