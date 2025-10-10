"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const meal_route_1 = require("../modules/meal/meal.route");
const summary_route_1 = require("../modules/summary/summary.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRouter,
    },
    {
        path: "/meal",
        route: meal_route_1.MealRouter,
    },
    {
        path: "/summary",
        route: summary_route_1.SummaryRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
