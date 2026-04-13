import { RequestConfig } from "../core/client";
type RequestInterceptor = (config: RequestConfig) => RequestConfig;
type ResponseInterceptor = (response: any) => any;
export declare class InterceptorManager {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
    useRequest(fn: RequestInterceptor): void;
    useResponse(fn: ResponseInterceptor): void;
}
export {};
//# sourceMappingURL=interceptors.d.ts.map