import express, { Express, Request, Response, Application } from "express";
import ticketsRouter from "./api/tickets";

const router = express.Router();

router.use("/api/tickets", ticketsRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

export default router;
