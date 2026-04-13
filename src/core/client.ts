import { retry } from "../features/retry";
import { createTimeout } from "../features/timeout";
import { logger } from "../utils/logger";
import { ThusError } from "../utils/error";
import { InterceptorManager } from "../features/interceptors";
import { PluginManager } from "../features/plugins";
import { startTimer, endTimer } from "../features/timeline";
import { explainError } from "../utils/error-explainer";
import { ThusConfig } from "./config";

export type RequestConfig = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
    retry?: number;
};

export class ThusFetch {
    interceptors = new InterceptorManager();
    plugins = new PluginManager();

    async request(config: RequestConfig) {
        const execute = async () => {
            const controller = new AbortController();

            const start = startTimer();

            let finalConfig = config;

            finalConfig = this.interceptors.request.reduce(
                (acc, fn) => fn(acc),
                finalConfig
            );

            finalConfig = this.plugins.runBefore(finalConfig);

            let timer: any;

            if (finalConfig.timeout) {
                timer = createTimeout(finalConfig.timeout, controller);
            }

            if (ThusConfig.debug) {
                logger.info(`Request → ${finalConfig.url}`);
            }

            const options: RequestInit = {
                method: finalConfig.method ?? "GET",
                headers: finalConfig.headers ?? {},
                signal: controller.signal
            };

            if (finalConfig.body != null) {
                options.body = JSON.stringify(finalConfig.body);
            }

            const res = await fetch(finalConfig.url, options);

            if (timer) clearTimeout(timer);

            const duration = endTimer(start);

            let data = await res.json();

            if (!res.ok) {
                const message = explainError(res.status);
                throw new ThusError(message, res.status, finalConfig.url);
            }

            data = this.interceptors.response.reduce(
                (acc, fn) => fn(acc),
                data
            );

            data = this.plugins.runAfter(data);

            if (ThusConfig.debug) {
                logger.success(`Success → ${finalConfig.url} (${duration}ms)`);
            }

            return data;
        };

        return retry(execute, config.retry || 0);
    }
}