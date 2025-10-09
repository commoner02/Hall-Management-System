import { Router } from "express";
import { getAll, getMe, loginUser, logout, registerUser, updateMeal, updateUser } from "./user.controller";
import { authCheck } from "../../middlewares/authUser";
import { IROLE } from "./user.interface";

const router = Router()

router.post('/register', authCheck(IROLE.admin), registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/getme', authCheck(IROLE.admin, IROLE.manager, IROLE.student), getMe)
router.get('/', authCheck(IROLE.admin), getAll)
router.patch('/update', authCheck(IROLE.admin), updateUser)
router.patch('/update-meal', authCheck(IROLE.admin, IROLE.manager, IROLE.student), updateMeal)

export const UserRouter = router