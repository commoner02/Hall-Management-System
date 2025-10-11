import { createUser, findUserByEmail, verifyPassword } from "./user.service";
import { User } from "./user.model";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    const { password: ignorePass, ...userObj } = user.toObject();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Registration successful.",
      data: userObj,
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
    }
    const ok = await verifyPassword(password, user?.password);
    if (!ok) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials.");
    }
    const token = generateToken({
      id: user?._id,
      email: user?.email,
      role: user?.role,
    });
    if (!token) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Token was not generated. Try again."
      );
    }
    const userSafe = await User.findById(user._id).select("-password");
    setAuthCookie(res, token as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: { ...userSafe?.toObject(), token: token },
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    setAuthCookie(res, "" as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Logout successful",
      data: null,
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};



export const getMe = async (req: Request, res: Response) => {
  try {
    const reqUser = req.user;
    const user = await findUserByEmail(reqUser.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
    }
    const userSafe = await User.findById(user._id).select("-password");
    sendResponse(res, {
      success: true,
      message: "Fetching successful",
      statusCode: httpStatus.OK,
      data: { ...userSafe?.toObject() },
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {id:userId, ...userData} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
    }
    const userSafe = await User.findByIdAndUpdate(user._id,userData).select("-password");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully.",
      data: { ...userSafe?.toObject() },
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const updateMeal = async (req: Request, res: Response) => {
  try {
    const {id:userId, mealStatus} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
    }
    const userSafe = await User.findByIdAndUpdate(user._id,{mealStatus}).select("-password");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Meal status updated successfully.",
      data: { ...userSafe?.toObject() },
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (err: any) {
    console.error(err);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};
