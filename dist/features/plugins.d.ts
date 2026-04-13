import { RequestConfig } from "../core/client";
export type Plugin = {
    beforeRequest?: (config: RequestConfig) => RequestConfig;
    afterResponse?: (response: any) => any;
};
export declare class PluginManager {
    plugins: Plugin[];
    use(plugin: Plugin): void;
    runBefore(config: RequestConfig): RequestConfig;
    runAfter(response: any): any;
}
//# sourceMappingURL=plugins.d.ts.map