"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorHelper_1 = __importDefault(require("../helpers/errorHelper"));
class UserController {
  constructor(userService) {
    this.userService = userService;
    //bind methods
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }
  register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
          throw errorHelper_1.default.UNAUTORIZED;
        }
        const result = yield this.userService.createAccount(
          userName,
          email,
          password
        );
        res.cookie("refreshToken", result.user.refresh_token, {
          httpOnly: true,
          secure: true,
          // Set the expiration time based on your requirements
          expires: new Date(Date.now() + 604800000), //7 days
        });
        return res.json({ access_token: result.user.access_token });
      } catch (e) {
        logger_1.default.error(e);
        next(e);
      }
    });
  }
  login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logger_1.default.info("login");
        const { email, password } = req.body;
        const result = yield this.userService.login(email, password);
        res.cookie("refreshToken", result.user.refresh_token, {
          httpOnly: true,
          secure: true,
          // Set the expiration time based on your requirements
          expires: new Date(Date.now() + 604800000), //7 days
        });
        res.json({ access_token: result.user.access_token });
      } catch (e) {
        logger_1.default.error(e);
        next(e);
      }
    });
  }
}
exports.default = UserController;
