import express from "express";
import ticketsRouter from "./api/tickets";

const router = express.Router();

router.use("/api/tickets", ticketsRouter);

export default router;
