"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThusFetch = void 0;
const retry_1 = require("../features/retry");
const timeout_1 = require("../features/timeout");
const logger_1 = require("../utils/logger");
const error_1 = require("../utils/error");
const interceptors_1 = require("../features/interceptors");
const plugins_1 = require("../features/plugins");
const timeline_1 = require("../features/timeline");
const error_explainer_1 = require("../utils/error-explainer");
const config_1 = require("./config");
class ThusFetch {
    interceptors = new interceptors_1.InterceptorManager();
    plugins = new plugins_1.PluginManager();
    async request(config) {
        const execute = async () => {
            const controller = new AbortController();
            const start = (0, timeline_1.startTimer)();
            let finalConfig = config;
            finalConfig = this.interceptors.request.reduce((acc, fn) => fn(acc), finalConfig);
            finalConfig = this.plugins.runBefore(finalConfig);
            let timer;
            if (finalConfig.timeout) {
                timer = (0, timeout_1.createTimeout)(finalConfig.timeout, controller);
            }
            if (config_1.ThusConfig.debug) {
                logger_1.logger.info(`Request → ${finalConfig.url}`);
            }
            const options = {
                method: finalConfig.method ?? "GET",
                headers: finalConfig.headers ?? {},
                signal: controller.signal
            };
            if (finalConfig.body != null) {
                options.body = JSON.stringify(finalConfig.body);
            }
            const res = await fetch(finalConfig.url, options);
            if (timer)
                clearTimeout(timer);
            const duration = (0, timeline_1.endTimer)(start);
            let data = await res.json();
            if (!res.ok) {
                const message = (0, error_explainer_1.explainError)(res.status);
                throw new error_1.ThusError(message, res.status, finalConfig.url);
            }
            data = this.interceptors.response.reduce((acc, fn) => fn(acc), data);
            data = this.plugins.runAfter(data);
            if (config_1.ThusConfig.debug) {
                logger_1.logger.success(`Success → ${finalConfig.url} (${duration}ms)`);
            }
            return data;
        };
        return (0, retry_1.retry)(execute, config.retry || 0);
    }
}
exports.ThusFetch = ThusFetch;
//# sourceMappingURL=client.js.map