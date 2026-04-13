"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (msg) => console.log(`[ThusFetch] ${msg}`),
    success: (msg) => console.log(`[ThusFetch OK] ${msg}`),
    error: (msg) => console.log(`[ThusFetch ERROR] ${msg}`),
};
//# sourceMappingURL=logger.js.map