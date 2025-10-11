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
exports.getSummary = exports.getSummaryByDate = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const summary_model_1 = require("./summary.model");
const user_model_1 = require("../user/user.model");
const user_interface_1 = require("../user/user.interface");
const getSummaryByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.params;
        const date = new Date(payload === null || payload === void 0 ? void 0 : payload.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const summaryExists = yield summary_model_1.Summary.findOne({ date: date });
        if (!summaryExists) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Summary does not exist.");
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Summary fetch successful.",
            data: summaryExists,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getSummaryByDate = getSummaryByDate;
const getSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date(Date.now()).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const summaryExists = yield summary_model_1.Summary.findOne({ date: date });
        if (summaryExists) {
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.CREATED,
                message: "Summary fetch successful.",
                data: summaryExists,
            });
        }
        else {
            const { mealRate } = req.body;
            const totalMeal = yield user_model_1.User.countDocuments({ mealStatus: user_interface_1.IStatus.on });
            const totalMoney = mealRate * totalMeal;
            const summary = yield summary_model_1.Summary.create({
                date,
                mealRate,
                totalMeal,
                totalMoney,
            });
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.CREATED,
                message: "Summary created successful.",
                data: summary,
            });
        }
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getSummary = getSummary;
