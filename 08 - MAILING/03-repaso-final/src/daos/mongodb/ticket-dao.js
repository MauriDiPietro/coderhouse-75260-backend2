import MongoDao from "./mongo-dao.js";
import { TicketModel } from "./models/ticket-model.js";

export default class TicketDaoMongo extends MongoDao {
  constructor(model) {
    super(model);
  }
}

export const ticketDaoMongo = new TicketDaoMongo(TicketModel);
