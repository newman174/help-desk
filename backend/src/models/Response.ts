// response.ts

import { Schema, model, Types } from "mongoose";

export interface TicketResponseInterface {
  _id: Types.ObjectId;
  createdAt: Date;
  message: string;
}

export const ticketResponseSchema = new Schema<TicketResponseInterface>(
  {
    message: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

ticketResponseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.createdAt = returnedObject.createdAt.toJSON();
    returnedObject.updatedAt = returnedObject.updatedAt.toJSON();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TicketResponse = model("TicketResponse", ticketResponseSchema);
