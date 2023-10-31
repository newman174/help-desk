import express from "express";
import ticketsRouter from "./api/tickets";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

const router = express.Router();

router.use("/api/tickets", ticketsRouter);

// export const srcDir = dirname(fileURLToPath(import.meta.url));

// router.use(express.static(srcDir + "/../dist"));

export default router;
