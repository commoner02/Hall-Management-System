import { Router } from "express";
import { getSummary, getSummaryByDate } from "./summary.controller";
import { authCheck } from "../../middlewares/authUser";
import { IROLE } from "../user/user.interface";

const router = Router();


router.post('/', authCheck(IROLE.admin), getSummary)
router.get('/:date', getSummaryByDate)

export const SummaryRouter = router;