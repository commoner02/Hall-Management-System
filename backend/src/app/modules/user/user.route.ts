import { Router } from "express";
import { getMe, loginUser, registerUser, updateUser } from "./user.controller";
import { authCheck } from "../../middlewares/authUser";
import { IROLE } from "./user.interface";

const router = Router()

router.post('/register', authCheck(IROLE.admin), registerUser)
router.post('/login', loginUser)
router.get('/getme', authCheck(IROLE.admin, IROLE.manager, IROLE.student), getMe)
router.patch('/update', authCheck(IROLE.admin), updateUser)

export const UserRouter = router