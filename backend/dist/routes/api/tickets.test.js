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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const globals_1 = require("@jest/globals");
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const testData = {
    name: "Hamachi Catperson",
    email: "ham@cat.net",
    description: "Hi,\n\n It doesn't work.",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let newTicket;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    newTicket = new Ticket_1.default(testData);
    yield newTicket.save();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Ticket_1.default.deleteMany({});
}));
afterAll(() => {
    app_1.default.close();
});
(0, globals_1.describe)("GET /api/tickets", () => {
    (0, globals_1.test)("returns 200 when the request is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/tickets");
        (0, globals_1.expect)(res.status).toEqual(200);
    }));
    (0, globals_1.test)("returns an array of tickets", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/tickets");
        const { body } = res;
        (0, globals_1.expect)(body).toHaveLength(1);
        (0, globals_1.expect)(body).toMatchObject([testData]);
        (0, globals_1.expect)(body[0].id).toBeDefined();
        (0, globals_1.expect)(body[0].status).toEqual("new");
        (0, globals_1.expect)(body[0].createdAt).toBeDefined();
        (0, globals_1.expect)(body[0].updatedAt).toBeDefined();
    }));
});
(0, globals_1.test)("Ticket status can be updated only with valid options", () => __awaiter(void 0, void 0, void 0, function* () {
    const statuses = ["new", "in progress", "resolved"];
    for (let index = 0; index < statuses.length; index++) {
        const status = statuses[index];
        const res = yield (0, supertest_1.default)(app_1.default)
            .put("/api/tickets/" + newTicket.id)
            .send({ status });
        const { body } = res;
        (0, globals_1.expect)(body.status).toEqual(status);
    }
    const res = yield (0, supertest_1.default)(app_1.default)
        .put("/api/tickets/" + newTicket.id)
        .send({ status: "foo" });
    (0, globals_1.expect)(res.status).toEqual(400);
}));
(0, globals_1.test)("Ticket responses can be created", () => __awaiter(void 0, void 0, void 0, function* () {
    const message = "Hi,\n\nWe can help.";
    const res = yield (0, supertest_1.default)(app_1.default)
        .put("/api/tickets/" + newTicket.id)
        .send({
        message,
    });
    (0, globals_1.expect)(res.statusCode).toEqual(200);
    const { body } = res;
    (0, globals_1.expect)(body.responses).toHaveLength(1);
    (0, globals_1.expect)(body.responses[0].message).toEqual(message);
}));
