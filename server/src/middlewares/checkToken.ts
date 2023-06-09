import jwt from "jsonwebtoken";
import CustomRequest from "../interfaces/CustomRequest";
import * as dotenv from "dotenv";
import httpCodes from "../helpers/errorHelper";
import { NextFunction } from "express";
dotenv.config();

interface CustomHeaders extends Headers {
  authorization?: string;
}

const checkToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = (req.headers as CustomHeaders)?.authorization;
    if (!authorizationHeader?.startsWith("Bearer ")) {
      throw new Error("Invalid token");
    }

    const token = authorizationHeader.split(" ")[1];
    // You can now use the token for further processing or validation

    const payload = jwt.verify(token, process.env.SECRET as string) as { userId: string | undefined };

    // Pass the token to the next middleware or route handler
    req.userId = payload.userId;
    next();
  } catch (e) {
    // Handle the error if the token is missing or invalid
    next(httpCodes.INVALID_TOKEN);
  }
};

export { checkToken };
