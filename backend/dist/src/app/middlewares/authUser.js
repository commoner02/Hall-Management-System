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
exports.authCheck = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../modules/user/user.model");
const authCheck = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    const token = req.cookies.token || req.headers.authorization;
    // const token = req.cookies?.token;
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User not logged in.");
    }
    const verifiedToken = (0, jwt_1.verifyToken)(token);
    if (!verifiedToken) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authorized.");
    }
    const ifUserExist = yield user_model_1.User.findOne({ email: verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.email });
    if (!ifUserExist) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User does not exist.");
    }
    if (!authRoles.includes(ifUserExist === null || ifUserExist === void 0 ? void 0 : ifUserExist.role)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You do not have permission to access the endpoint.");
    }
    req.user = verifiedToken;
    console.log(req.user);
    next();
});
exports.authCheck = authCheck;
