"use strict";
// Ticket.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Response_1 = require("./Response");
const ticketSchema = new mongoose_1.default.Schema({
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
        type: [Response_1.ticketResponseSchema],
        default: [],
        required: true,
    },
    status: {
        type: String,
        default: "new",
        required: true,
    },
}, {
    timestamps: true,
});
ticketSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.createdAt = returnedObject.createdAt.toJSON();
        returnedObject.updatedAt = returnedObject.updatedAt.toJSON();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model("Ticket", ticketSchema);
