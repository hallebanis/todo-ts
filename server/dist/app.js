"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const logger_1 = __importDefault(require("./utils/logger"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const UserService_1 = __importDefault(require("./services/UserService"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const PORT = process_1.env.PORT ? +process_1.env.PORT : 5000;
const prisma = new client_1.PrismaClient();
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
const userService = new UserService_1.default(prisma);
const userController = new UserController_1.default(userService);
const userRoutes = new UserRoutes_1.default(userController);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/healthcheck', (req, res) => {
    console.log(req.headers.authorization);
    res.cookie('refreshToken', 'Bearer ggggS', {
        httpOnly: true,
        secure: true,
        // Set the expiration time based on your requirements
        expires: new Date(Date.now() + 604800000), //7 days
    });
    return res.send(`server is running on PORT ${PORT}`);
});
app.use('/user', userRoutes.userRouter);
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    logger_1.default.log('info', `SERVER IS RUNNING ON ${PORT}`);
});
