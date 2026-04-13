"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
class PluginManager {
    plugins = [];
    use(plugin) {
        this.plugins.push(plugin);
    }
    runBefore(config) {
        return this.plugins.reduce((acc, p) => (p.beforeRequest ? p.beforeRequest(acc) : acc), config);
    }
    runAfter(response) {
        return this.plugins.reduce((acc, p) => (p.afterResponse ? p.afterResponse(acc) : acc), response);
    }
}
exports.PluginManager = PluginManager;
//# sourceMappingURL=plugins.js.map