import { InterceptorManager } from "../features/interceptors";
import { PluginManager } from "../features/plugins";
export type RequestConfig = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
    retry?: number;
};
export declare class ThusFetch {
    interceptors: InterceptorManager;
    plugins: PluginManager;
    request(config: RequestConfig): Promise<any>;
}
//# sourceMappingURL=client.d.ts.map