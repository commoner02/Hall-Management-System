import { Router } from "express";
import { createMeal, getAllMeals, getMeal, getMealByDate, updateMeal } from './meal.controller';
import { authCheck } from "../../middlewares/authUser";
import { IROLE } from "../user/user.interface";

const router = Router()

router.post('/', authCheck(IROLE.manager), createMeal)
router.patch('/:id', authCheck(IROLE.manager), updateMeal)
router.get('/date', getMealByDate)
router.get('/:id', getMeal)
router.get('/', getAllMeals)

export const MealRouter = router;