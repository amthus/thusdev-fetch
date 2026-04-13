"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThusError = void 0;
class ThusError extends Error {
    status;
    url;
    constructor(message, status, url) {
        super(message);
        this.name = "ThusError";
        this.status = status;
        this.url = url;
    }
}
exports.ThusError = ThusError;
//# sourceMappingURL=error.js.map