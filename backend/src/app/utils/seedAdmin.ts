import { IROLE } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { createUser, findUserByEmail } from "../modules/user/user.service";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  const name = "Sakin";
  const email = "saleheen.sakin@gmail.com";
  const password = "Pass1234!";
  const role = IROLE.admin;
  const existing = await findUserByEmail(email);

  if (existing) {
    console.log("Admin exists.");
  } else {
    const hashed = await bcrypt.hash(password, 10);
    const admin = User.create({ name, email, password: hashed, role });
  }
};
