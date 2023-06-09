import express, { NextFunction, Router } from "express";
import UserController from "../controllers/UserController";
import { checkToken } from "../middlewares/checkToken";
import CustomRequest from "../interfaces/CustomRequest";
class UserRoutes {
  private router: Router;
  private userController: UserController;
  constructor(userController: UserController) {
    this.userController = userController;
    this.router = express.Router();

    this.router.post("/register", userController.register);
    this.router.post("/login", userController.login);

    this.router.get("/profile/self", (req: CustomRequest, res: Response, next: NextFunction) => checkToken(req, res, next), userController.getSelfProfile);
  }

  get userRouter() {
    return this.router;
  }
}

export default UserRoutes;
