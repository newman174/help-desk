import { faker } from "@faker-js/faker";
import axios from "axios";
import { TicketInterface } from "./models/Ticket";

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const statuses = ["new", "in progress", "resolved"];

(async () => {
  for (let index = 0; index < 10; index++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    let newTicket = (await axios.post("http://localhost:3000/api/tickets", {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}@${lastName.toLowerCase()}.com`,
      description: faker.lorem.paragraph(),
    })) as TicketInterface;

    // console.log(newTicket);
    // newTicket = await axios.put(
    //   "http://localhost:3000/api/tickets/" + newTicket.id,
    //   {
    //     status: statuses[getRandomInt(0, 2)],
    //   }
    // );
  }
})();
