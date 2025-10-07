"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVariables = [
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
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        JWT_ACCESS_SECRET: process.env.JWT_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_EXPIRES,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_NAME: process.env.ADMIN_NAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
        FRONTEND_URL: process.env.FRONTEND_URL,
        MONGODB_URL: process.env.MONGODB_URL,
    };
};
exports.envVars = loadEnvVariables();
