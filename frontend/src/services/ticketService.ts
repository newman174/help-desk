import axios from "axios";
import {
  NewTicket,
  StatusOption,
  Ticket,
  TicketResponse,
} from "../types/types";

const BASE_URL = "/api/tickets";

interface TicketJSON extends Omit<Ticket, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

interface ResponseJSON extends Omit<TicketResponse, "createdAt" | "updatedAt"> {
  createdAt: string | Date;
  updatedAt: string | Date;
}

const ticketFromJSON = (ticketJSON: TicketJSON): Ticket => {
  return {
    ...ticketJSON,
    createdAt: new Date(ticketJSON.createdAt),
    updatedAt: new Date(ticketJSON.updatedAt),
    responses: ticketJSON.responses.map((respJSON: ResponseJSON) => {
      return {
        ...respJSON,
        createdAt: new Date(respJSON.createdAt),
        updatedAt: new Date(respJSON.updatedAt),
      };
    }),
  };
};

export const createTicket = async (ticket: NewTicket) => {
  try {
    const response = await axios.post(BASE_URL, ticket);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await axios.get(BASE_URL);
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid response data");
    }
    const tickets: Ticket[] = response.data.map((ticket) => {
      return {
        ...ticket,
        createdAt: new Date(ticket.createdAt),
        updatedAt: new Date(ticket.updatedAt),
        responses: ticket.responses.map(
          (resp: { id: string; createdAt: string }) => {
            return {
              ...resp,
              createdAt: new Date(resp.createdAt),
            };
          }
        ),
      };
    });

    return tickets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateStatus = async (
  ticketId: string,
  status: StatusOption
): Promise<Ticket | undefined> => {
  try {
    const response = await axios.put(`${BASE_URL}/${ticketId}`, { status });
    return ticketFromJSON(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const sendResponse = async (
  ticketId: string,
  message: string
): Promise<Ticket | undefined> => {
  try {
    const response = await axios.put(`${BASE_URL}/${ticketId}`, { message });
    console.log("Email would be sent now. Content:");
    console.log(message);
    return ticketFromJSON(response.data);
  } catch (error) {
    console.error(error);
  }
};
