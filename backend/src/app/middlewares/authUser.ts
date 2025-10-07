import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { verifyToken } from '../utils/jwt';
import { User } from "../modules/user/user.model";

export const authCheck =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies)
    const token = req.cookies.token || req.headers.authorization;
    // const token = req.cookies?.token;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "No token provided");
    }

    const verifiedToken = verifyToken(token as string);

    if (!verifiedToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is not authorized.");
    }

    const ifUserExist = await User.findOne({email:verifiedToken?.email})

    if (!ifUserExist) {
      throw new AppError(httpStatus.FORBIDDEN, "User does not exist.");
    }


    if (!authRoles.includes(ifUserExist?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have permission to access the endpoint."
      );
    }

    req.user = verifiedToken;
    console.log(req.user)

    next();
  };