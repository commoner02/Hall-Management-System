"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, }) {
    const existing = yield (0, exports.findUserByEmail)(email);
    if (existing) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exists with this email.");
    }
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    return user_model_1.User.create({ name, email, password: hashed });
});
exports.createUser = createUser;
const findUserByEmail = (email) => {
    const user = user_model_1.User.findOne({ email });
    return user;
};
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => user_model_1.User.findById(id);
exports.findUserById = findUserById;
const verifyPassword = (plain, hashed) => bcryptjs_1.default.compare(plain, hashed);
exports.verifyPassword = verifyPassword;
