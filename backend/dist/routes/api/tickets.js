"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const Response_1 = require("../../models/Response");
const emailService_1 = __importDefault(require("../../services/emailService"));
const ticketsRouter = express_1.default.Router();
ticketsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket_1.default.find({});
    res.json(tickets);
}));
ticketsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield Ticket_1.default.findById(req.params.id);
    if (ticket) {
        res.json(ticket);
    }
    else {
        res.status(404).end();
    }
}));
ticketsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, description } = req.body;
    const ticket = new Ticket_1.default({
        name,
        email,
        description,
        response: [],
    });
    const savedTicket = yield ticket.save();
    res.status(201).json(savedTicket.toJSON());
}));
ticketsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, message } = req.body;
    const ticket = yield Ticket_1.default.findById(id);
    if (!ticket) {
        return res.status(404).json({ error: "No ticket found with id " + id });
    }
    if (message && typeof message === "string") {
        (0, emailService_1.default)(message);
        const newResponse = new Response_1.TicketResponse({
            message,
        });
        if ("responses" in ticket) {
            ticket.responses = ticket.responses.concat(newResponse);
        }
    }
    if (status) {
        if (["new", "in progress", "resolved"].includes(status)) {
            ticket.status = status;
        }
        else {
            return res.status(400).json({ error: "Invalid status: " + status });
        }
    }
    const savedTicket = yield ticket.save();
    res.json(savedTicket);
}));
exports.default = ticketsRouter;
