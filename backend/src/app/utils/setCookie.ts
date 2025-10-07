import { Response } from "express";


export const setAuthCookie = (res: Response, token: string) => {
  if (token) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
  }
};

