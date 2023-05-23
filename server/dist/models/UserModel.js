"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    constructor(input) {
        this.id = input.id;
        this.email = input.email;
        if (input.password)
            this.password = input.password;
        this.userName = input.userName;
        if (input.access_token)
            this.access_token = input.access_token;
        if (input.refresh_token)
            this.refresh_token = input.refresh_token;
    }
    getUserBasicData() {
        return {
            userName: this.userName,
            email: this.email,
            id: this.id,
        };
    }
}
exports.default = UserModel;
