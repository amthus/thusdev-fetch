"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
async function retry(fn, count) {
    try {
        return await fn();
    }
    catch (err) {
        if (count <= 0)
            throw err;
        return retry(fn, count - 1);
    }
}
//# sourceMappingURL=retry.js.map