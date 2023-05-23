import { User } from '../interfaces/User';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import httpCodes from '../helpers/errorHelper';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

class UserService {
  prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  public createAccount(
    userName: string,
    email: string,
    password: string
  ): Promise<{ user: User }> {
    return new Promise<{ user: User }>(async (resolve, reject) => {
      let user: User | null = await this.prismaClient.user.findFirst({
        where: { email },
      });
      if (user) {
        reject(httpCodes.UNAUTORIZED);
        return;
      }
      const salt: string = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const data = { userName, email, password: hash };
      const newUser: User = await this.prismaClient.user.create({
        data,
      });
      const refreshToken: string = jwt.sign(
        { userId: newUser.id },
        process.env.SECRET!,
        {
          expiresIn: '7d',
        }
      );
      const accessToken: string = jwt.sign(newUser, process.env.SECRET!, {
        expiresIn: '1h',
      });
      newUser.refresh_token = `Bearer ${refreshToken}`;
      newUser.access_token = `Bearer ${accessToken}`;
      if (newUser.password) delete newUser.password;
      resolve({ user: newUser });
    });
  }

  public login(email: string, password: string) {
    return new Promise<{ user: User }>(async (resolve, reject) => {
      try {
        const user: User | null = await this.prismaClient.user.findFirst({
          where: { email },
        });
        if (!user?.password) throw httpCodes.NOT_FOUND;
        const isPasswordValid: boolean = await bcrypt.compare(
          password,
          user.password
        );
        if (!isPasswordValid) throw httpCodes.UNAUTORIZED;

        const refreshToken: string = jwt.sign(
          { userId: user.id },
          process.env.SECRET!,
          {
            expiresIn: '7d',
          }
        );
        const accessToken: string = jwt.sign(user, process.env.SECRET!, {
          expiresIn: '1h',
        });
        user.refresh_token = `Bearer ${refreshToken}`;
        user.access_token = `Bearer ${accessToken}`;
        if (user.password) delete user.password;
        resolve({ user });
      } catch (e) {
        logger.error(`UserService.login(${email})`);
        reject(e);
      }
    });
  }

  public getUserById(userId: string) {
    return new Promise<{ user: User }>(async (resolve, reject) => {
      try {
        const user: User | null = await this.prismaClient.user.findUnique({
          where: { id: userId },
        });
        if (!user) throw httpCodes.NOT_FOUND;
        resolve({ user });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default UserService;
