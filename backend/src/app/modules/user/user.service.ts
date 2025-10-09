import bcrypt from "bcryptjs";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const existing = await findUserByEmail(email);

  if (existing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email."
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed });
};

export const findUserByEmail = (email: string) => {
  const user = User.findOne({ email });
  return user;
};

export const findUserById = (id: string) => User.findById(id);

export const verifyPassword = (plain: string, hashed: string) =>
  bcrypt.compare(plain, hashed);
