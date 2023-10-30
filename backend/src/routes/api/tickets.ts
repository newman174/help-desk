import express, { Express, Request, Response, Application } from "express";
import Ticket, { TicketInterface } from "../../models/Ticket";
import { TicketResponse } from "../../models/Response";

const ticketsRouter = express.Router();

ticketsRouter.get("/", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.json(tickets);
});

ticketsRouter.get("/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).end();
  }
});

ticketsRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, description } = req.body;
  console.table(req.body);
  const ticket = new Ticket({
    name,
    email,
    description,
    response: [],
  });

  const savedTicket = await ticket.save();
  console.table(savedTicket.toJSON());
  res.status(201).json(savedTicket.toJSON());
});

ticketsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, message } = req.body;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    return res.status(404).json({ error: "No ticket found with id " + id });
  }

  if (message && typeof message === "string") {
    const newResponse = new TicketResponse({
      message,
    });
    if ("responses" in ticket) {
      ticket.responses = ticket.responses.concat(newResponse);
    }
  }

  if (status) {
    if (["new", "in progress", "resolved"].includes(status)) {
      ticket.status = status;
    } else {
      return res.status(400).json({ error: "Invalid status: " + status });
    }
  }

  const savedTicket = await ticket.save();
  res.json(savedTicket);
});

export default ticketsRouter;
