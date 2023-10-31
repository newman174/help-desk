// types.ts

export interface NewTicketResponse {
  message: string;
}

export interface TicketResponse extends NewTicketResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewTicket {
  name: string;
  email: string;
  description: string;
}

export type StatusOption = "new" | "in progress" | "resolved";

export interface Ticket extends NewTicket {
  id: string;
  responses: TicketResponse[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusOption;
}

export interface AlertInterface {
  severity: "error" | "warning" | "info" | "success";
  message: string;
}
