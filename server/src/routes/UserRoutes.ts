import express, { Router } from 'express';
import UserController from '../controllers/UserController';
class UserRoutes {
  private router: Router;
  private userController: UserController;
  constructor(userController: UserController) {
    this.userController = userController;
    this.router = express.Router();

    this.router.post('/register', userController.register);
    this.router.post('/login', userController.login);
  }

  get userRouter() {
    return this.router;
  }
}

export default UserRoutes;
