"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainError = explainError;
function explainError(status) {
    if (!status)
        return "Network error or request failed.";
    if (status >= 500)
        return "Server error. The API is down or unstable.";
    if (status === 404)
        return "Resource not found. Check the URL.";
    if (status === 401)
        return "Unauthorized. Missing or invalid API key.";
    if (status === 403)
        return "Forbidden. You don't have access.";
    return "Unexpected error occurred.";
}
//# sourceMappingURL=error-explainer.js.map