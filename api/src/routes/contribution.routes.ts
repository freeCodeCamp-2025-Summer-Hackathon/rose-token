// src/routes/contribution.route.ts
import { Router } from "express";
import { handleCreateContribution } from "../controller/contribution.controller";

const router = Router();

router.post("/contributions", handleCreateContribution);

export default router;
