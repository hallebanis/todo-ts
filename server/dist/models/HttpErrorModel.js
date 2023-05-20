"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpErrorModel {
    constructor(name, message, code, cause = undefined, privateStack = undefined) {
        this.name = name;
        this.code = code;
        this.message = message;
        if (cause)
            this.cause = cause;
        if (privateStack)
            this.stack = privateStack;
    }
    get stack() {
        return this.privateStack;
    }
    set stack(value) {
        this.privateStack = value;
    }
}
exports.default = HttpErrorModel;
