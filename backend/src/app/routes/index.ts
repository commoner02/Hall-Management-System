import express from "express";
import { UserRouter } from "../modules/user/user.route";
import { MealRouter } from "../modules/meal/meal.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/meal",
    route: MealRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
