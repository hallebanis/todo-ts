import UserService from '../services/UserService';
import logger from '../utils/logger';
import express from 'express';
import httpCodes from '../helpers/errorHelper';

class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    //bind methods
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }
  async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) {
        throw httpCodes.UNAUTORIZED;
      }
      const result = await this.userService.createAccount(
        userName,
        email,
        password
      );
      res.cookie('refreshToken', result.user.refresh_token, {
        httpOnly: true,
        secure: true, // Enable for HTTPS connections
        // Set the expiration time based on your requirements
        expires: new Date(Date.now() + 604800000), //7 days
      });
      return res.json({ access_token: result.user.access_token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      logger.info('login');
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.cookie('refreshToken', result.user.refresh_token, {
        httpOnly: true,
        secure: true, // Enable for HTTPS connections
        // Set the expiration time based on your requirements
        expires: new Date(Date.now() + 604800000), //7 days
      });
      res.json({ access_token: result.user.access_token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}

export default UserController;
