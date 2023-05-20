import { PrismaClient } from '@prisma/client';
import express, { Express } from 'express';
import { env } from 'process';
import logger from './utils/logger';

const PORT: number = env.PORT ? +env.PORT : 5000;

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('db connected');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const app: Express = express();

app.listen(PORT, () => {
  logger.log('warn', `SERVER IS RUNNING ON ${PORT}`);
});
