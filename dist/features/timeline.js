"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTimer = startTimer;
exports.endTimer = endTimer;
function startTimer() {
    return Date.now();
}
function endTimer(start) {
    return Date.now() - start;
}
//# sourceMappingURL=timeline.js.map