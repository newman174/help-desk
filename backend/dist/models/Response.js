"use strict";
// Response.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketResponse = exports.ticketResponseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ticketResponseSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
        minlength: 1,
    },
}, {
    timestamps: true,
});
exports.ticketResponseSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.createdAt = returnedObject.createdAt.toJSON();
        returnedObject.updatedAt = returnedObject.updatedAt.toJSON();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.TicketResponse = (0, mongoose_1.model)("TicketResponse", exports.ticketResponseSchema);
