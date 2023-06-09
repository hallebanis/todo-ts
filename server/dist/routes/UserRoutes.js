"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class UserRoutes {
  constructor(userController) {
    this.userController = userController;
    this.router = express_1.default.Router();
    this.router.post("/register", userController.register);
    this.router.post("/login", userController.login);
  }
  get userRouter() {
    return this.router;
  }
}
exports.default = UserRoutes;
