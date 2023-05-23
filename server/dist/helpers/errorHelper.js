"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpErrorModel_1 = __importDefault(require("../models/HttpErrorModel"));
const httpCodes = {
    BAD_REQUEST: new HttpErrorModel_1.default('Bad Request', 'Bad Request', 400),
    UNAUTORIZED: new HttpErrorModel_1.default('unauthorized', 'unauthorized', 401),
    FORBIDDEN: new HttpErrorModel_1.default('Forbidden', 'Forbidden', 403),
    NOT_FOUND: new HttpErrorModel_1.default('not found', 'not found', 404),
    INVALID_TOKEN: new HttpErrorModel_1.default('invalid token', 'invalid token', 498),
    UNPROCESSABLE: new HttpErrorModel_1.default('Unprocessable Content', 'Unprocessable Content ', 422),
    SERVICE_UNAVAILMABLE: new HttpErrorModel_1.default('server', 'Service Unavailable', 503),
};
exports.default = httpCodes;
