"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Invalid MONGODB_URI");
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
mongoose_1.default.set("strictQuery", false);
console.log("connecting to MongoDB");
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
});
app.use(index_1.default);
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
exports.default = server;
