import { ticketRepository } from "../repositories/ticket-repository.js";
import { createResponse } from '../utils.js'

export default class TicketController {
  constructor(repository) {
    this.repository = repository;
  }

  async generateTicket(req, res, next) {
    try {
     const user = req.user;
     const ticket = await this.repository.generateTicket(user)
     createResponse(res, 201, ticket)
    } catch (error) {
      next(error);
    }
  }
}

export const ticketController = new TicketController(ticketRepository);
