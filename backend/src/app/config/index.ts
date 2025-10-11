import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  EXPRESS_SESSION_SECRET: string;
  FRONTEND_URL: string;
  MONGODB_URL: string;
  ADMIN_NAME: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
    "JWT_EXPIRES",
    "JWT_SECRET",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "ADMIN_NAME",
    "FRONTEND_URL",
    "MONGODB_URL"
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variabl ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_SECRET: process.env.JWT_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_EXPIRES as string,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_NAME: process.env.ADMIN_NAME as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    MONGODB_URL: process.env.MONGODB_URL as string,
  };
};

export const envVars = loadEnvVariables();