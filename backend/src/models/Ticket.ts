// ticket.ts

import mongoose, { Types } from "mongoose";
import { TicketResponseInterface, ticketResponseSchema } from "./Response";

export interface TicketInterface {
  id: Types.ObjectId;
  name: string;
  email: string;
  responses: TicketResponseInterface[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "new" | "in progress" | "resolved";
}

const ticketSchema = new mongoose.Schema<TicketInterface>(
  {
    name: {
      type: String,
      minLength: 1,
      required: true,
    },
    email: {
      type: String,
      minLength: 5,
      required: true,
    },
    description: {
      type: String,
      minlength: 1,
      required: true,
    },
    responses: {
      type: [ticketResponseSchema],
      default: [],
      required: true,
    },
    status: {
      type: String,
      default: "new",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.createdAt = returnedObject.createdAt.toJSON();
    returnedObject.updatedAt = returnedObject.updatedAt.toJSON();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export default mongoose.model("Ticket", ticketSchema);
export default mongoose.model("Ticket", ticketSchema);
