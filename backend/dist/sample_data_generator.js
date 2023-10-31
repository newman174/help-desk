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
const faker_1 = require("@faker-js/faker");
const axios_1 = __importDefault(require("axios"));
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const statuses = ["new", "in progress", "resolved"];
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < 10; index++) {
        const firstName = faker_1.faker.person.firstName();
        const lastName = faker_1.faker.person.lastName();
        let newTicket = (yield axios_1.default.post("http://localhost:3000/api/tickets", {
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}@${lastName.toLowerCase()}.com`,
            description: faker_1.faker.lorem.paragraph(),
        }));
        console.log(newTicket);
        newTicket = yield axios_1.default.put("http://localhost:3000/api/tickets/" + newTicket.id, {
            status: statuses[getRandomInt(0, 2)],
        });
    }
}))();
