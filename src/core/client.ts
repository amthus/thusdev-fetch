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
    baseURL?: string;
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

            const url = finalConfig.baseURL
                ? `${finalConfig.baseURL}${finalConfig.url}`
                : finalConfig.url;

            if (ThusConfig.debug) {
                logger.info(`Request → ${url}`);
            }

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...(finalConfig.headers || {})
            };

            const options: RequestInit = {
                method: finalConfig.method ?? "GET",
                headers,
                signal: controller.signal
            };

            if (finalConfig.body != null) {
                options.body = JSON.stringify(finalConfig.body);
            }

            const res = await fetch(url, options);

            if (timer) clearTimeout(timer);

            const duration = endTimer(start);

            let data: any;

            try {
                data = await res.json();
            } catch {
                data = await res.text();
            }

            if (!res.ok) {
                const message = explainError(res.status);
                throw new ThusError(message, res.status, url);
            }

            data = this.interceptors.response.reduce(
                (acc, fn) => fn(acc),
                data
            );

            data = this.plugins.runAfter(data);

            if (ThusConfig.debug) {
                logger.success(`Success → ${url} (${duration}ms)`);
            }

            return data;
        };

        return retry(execute, config.retry || 0);
    }

    async get(url: string, config: Partial<RequestConfig> = {}) {
        return this.request({ ...config, url, method: "GET" });
    }

    async post(url: string, body?: any, config: Partial<RequestConfig> = {}) {
        return this.request({ ...config, url, body, method: "POST" });
    }

    async put(url: string, body?: any, config: Partial<RequestConfig> = {}) {
        return this.request({ ...config, url, body, method: "PUT" });
    }

    async delete(url: string, config: Partial<RequestConfig> = {}) {
        return this.request({ ...config, url, method: "DELETE" });
    }
}