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
exports.getAllMeals = exports.getMealByDate = exports.getMeal = exports.updateMeal = exports.createMeal = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const meal_model_1 = require("./meal.model");
const createMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meals, items, type } = req.body;
        let totalCost = 0;
        items === null || items === void 0 ? void 0 : items.forEach((item) => (totalCost += item.price * item.quantity));
        const date = new Date(Date.now()).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const payload = {
            meals,
            items,
            type,
            totalCost,
            date,
        };
        const meal = yield meal_model_1.Meal.create(payload);
        if (!meal) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Meal is not created.");
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Meal creation successful.",
            data: meal,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.createMeal = createMeal;
const updateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const payload = req.body;
        let totalCost = 0;
        (_a = payload === null || payload === void 0 ? void 0 : payload.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => (totalCost += item.price * item.quantity));
        if (totalCost != 0) {
            payload.totalCost = totalCost;
        }
        const meal = yield meal_model_1.Meal.findByIdAndUpdate(id, payload);
        if (!meal) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Meal is not updated.");
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Meal updated successfully.",
            data: meal,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.updateMeal = updateMeal;
// export const deleteMeal = async (req: Request, res: Response) => {
//   try {
//     const {id} = req.body;
//     const meal = await Meal.findByIdAndDelete(id);
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "Meal deletion successful.",
//       data: meal,
//     });
//   } catch (err: any) {
//     console.error(err);
//     throw new AppError(httpStatus.BAD_REQUEST, err.message);
//   }
// };
const getMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const meal = yield meal_model_1.Meal.findById(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Meal fetched successfully.",
            data: meal,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getMeal = getMeal;
const getMealByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.params;
        if (!date) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "A date is mandatory");
        }
        const dateValue = new Date(date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const meal = yield meal_model_1.Meal.findOne({ date: dateValue });
        if (!meal) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Meal not found.");
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Meal fetched successfully.",
            data: meal,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getMealByDate = getMealByDate;
const getAllMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meal = yield meal_model_1.Meal.find();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Meals fetched successfully.",
            data: meal,
        });
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.getAllMeals = getAllMeals;
