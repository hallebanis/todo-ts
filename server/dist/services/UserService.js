"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorHelper_1 = __importDefault(require("../helpers/errorHelper"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
class UserService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    createAccount(userName, email, password) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.prismaClient.user.findFirst({
                where: { email },
            });
            if (user) {
                reject(errorHelper_1.default.UNAUTORIZED);
                return;
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(password, salt);
            const data = { userName, email, password: hash };
            const newUser = yield this.prismaClient.user.create({
                data,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.SECRET, {
                expiresIn: '7d',
            });
            const accessToken = jsonwebtoken_1.default.sign(newUser, process.env.SECRET, {
                expiresIn: '1h',
            });
            newUser.refresh_token = `Bearer ${refreshToken}`;
            newUser.access_token = `Bearer ${accessToken}`;
            if (newUser.password)
                delete newUser.password;
            resolve({ user: newUser });
        }));
    }
    login(email, password) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prismaClient.user.findFirst({
                    where: { email },
                });
                if (!(user === null || user === void 0 ? void 0 : user.password))
                    throw errorHelper_1.default.NOT_FOUND;
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid)
                    throw errorHelper_1.default.UNAUTORIZED;
                const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.SECRET, {
                    expiresIn: '7d',
                });
                const accessToken = jsonwebtoken_1.default.sign(user, process.env.SECRET, {
                    expiresIn: '1h',
                });
                user.refresh_token = `Bearer ${refreshToken}`;
                user.access_token = `Bearer ${accessToken}`;
                if (user.password)
                    delete user.password;
                resolve({ user });
            }
            catch (e) {
                logger_1.default.error(`UserService.login(${email})`);
                reject(e);
            }
        }));
    }
    getUserById(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prismaClient.user.findUnique({
                    where: { id: userId },
                });
                if (!user)
                    throw errorHelper_1.default.NOT_FOUND;
                resolve({ user });
            }
            catch (e) {
                reject(e);
            }
        }));
    }
}
exports.default = UserService;
