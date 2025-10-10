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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.updateMeal = exports.updateUser = exports.getMe = exports.logout = exports.loginUser = exports.registerUser = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const setCookie_1 = require("../../utils/setCookie");
const jwt_1 = require("../../utils/jwt");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield (0, user_service_1.createUser)({ name, email, password });
        const _a = user.toObject(), { password: ignorePass } = _a, userObj = __rest(_a, ["password"]);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Registration successful.",
            data: userObj,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
        }
        const ok = yield (0, user_service_1.verifyPassword)(password, user === null || user === void 0 ? void 0 : user.password);
        if (!ok) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid credentials.");
        }
        const token = (0, jwt_1.generateToken)({
            id: user === null || user === void 0 ? void 0 : user._id,
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
        });
        if (!token) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Token was not generated. Try again.");
        }
        const userSafe = yield user_model_1.User.findById(user._id).select("-password");
        (0, setCookie_1.setAuthCookie)(res, token);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Login successful",
            data: Object.assign(Object.assign({}, userSafe === null || userSafe === void 0 ? void 0 : userSafe.toObject()), { token: token }),
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.loginUser = loginUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, setCookie_1.setAuthCookie)(res, "");
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Logout successful",
            data: null,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.logout = logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUser = req.user;
        const user = yield (0, user_service_1.findUserByEmail)(reqUser.email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
        }
        const userSafe = yield user_model_1.User.findById(user._id).select("-password");
        (0, sendResponse_1.default)(res, {
            success: true,
            message: "Fetching successful",
            statusCode: http_status_1.default.OK,
            data: Object.assign({}, userSafe === null || userSafe === void 0 ? void 0 : userSafe.toObject()),
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getMe = getMe;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { id: userId } = _a, userData = __rest(_a, ["id"]);
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
        }
        const userSafe = yield user_model_1.User.findByIdAndUpdate(user._id, userData).select("-password");
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "User updated successfully.",
            data: Object.assign({}, userSafe === null || userSafe === void 0 ? void 0 : userSafe.toObject()),
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.updateUser = updateUser;
const updateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId, mealStatus } = req.body;
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
        }
        const userSafe = yield user_model_1.User.findByIdAndUpdate(user._id, { mealStatus }).select("-password");
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Meal status updated successfully.",
            data: Object.assign({}, userSafe === null || userSafe === void 0 ? void 0 : userSafe.toObject()),
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.updateMeal = updateMeal;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Users fetched successfully.",
            data: users,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getAll = getAll;
