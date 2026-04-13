"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorManager = void 0;
class InterceptorManager {
    request = [];
    response = [];
    useRequest(fn) {
        this.request.push(fn);
    }
    useResponse(fn) {
        this.response.push(fn);
    }
}
exports.InterceptorManager = InterceptorManager;
//# sourceMappingURL=interceptors.js.map