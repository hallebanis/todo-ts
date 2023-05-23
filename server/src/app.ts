import { PrismaClient } from '@prisma/client';
import express, { Express } from 'express';
import { env } from 'process';
import logger from './utils/logger';
import errorHandler from './middlewares/errorHandler';
import UserService from './services/UserService';
import UserController from './controllers/UserController';
import UserRoutes from './routes/UserRoutes';

const PORT: number = env.PORT ? +env.PORT : 5000;

const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     console.log('db connected');
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

const userService = new UserService(prisma);

const userController = new UserController(userService);

const userRoutes = new UserRoutes(userController);

const app: Express = express();

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  return res.send(`server is running on PORT ${PORT}`);
});
app.use('/user', userRoutes.userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.log('info', `SERVER IS RUNNING ON ${PORT}`);
});
