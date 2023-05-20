"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpErrorModel_1 = __importDefault(require("../models/HttpErrorModel"));
// Error handler middleware function
function errorHandler(err, _, res) {
    console.error(err); // Log the error for debugging purposes
    // Check if the error is an instance of a known error class
    if (err instanceof HttpErrorModel_1.default) {
        // Handle the known error
        return res.status(err.code).json({ error: err.message });
    }
    // Handle other types of errors
    return res.status(500).json({ error: 'Internal Server Error' });
}
module.exports = errorHandler;
