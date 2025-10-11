import { Router } from "express";
import { createMeal, getAllMeals, getMeal, getMealByDate, updateMeal } from './meal.controller';
import { authCheck } from "../../middlewares/authUser";
import { IROLE } from "../user/user.interface";

const router = Router()

router.post('/', authCheck(IROLE.manager), createMeal)
router.get('/', getAllMeals)
router.get('/date/:date', getMealByDate)
router.get('/:id', getMeal)
router.patch('/:id', authCheck(IROLE.manager), updateMeal)

export const MealRouter = router;