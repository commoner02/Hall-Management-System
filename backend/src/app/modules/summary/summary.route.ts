import { Router } from "express";
import { getSummary, getSummaryByDate } from "./summary.controller";
import { authCheck } from "../../middlewares/authUser";
import { IROLE } from "../user/user.interface";

const router = Router();

router.get('/', getSummaryByDate)

router.post('/', authCheck(IROLE.admin), getSummary)

export const SummaryRouter = router;