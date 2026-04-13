"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeout = createTimeout;
function createTimeout(ms, controller) {
    return setTimeout(() => {
        controller.abort();
    }, ms);
}
//# sourceMappingURL=timeout.js.map