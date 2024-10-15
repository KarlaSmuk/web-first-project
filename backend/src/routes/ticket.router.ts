import express from "express";
import { createTicket, fetchTicket, getTotalNumberOfTickets } from "../controllers/ticket.controller";
import { validateRequest } from "../middleware/validateRequest";
import { CreateTicketDto } from "../models/requests/createTicket.dto";
import { jwtCheck } from "../middleware/jwtCheck";

const router = express.Router();

router.get("/totalNumber", getTotalNumberOfTickets);
router.get("/:ticketId", fetchTicket);
router.post("/", jwtCheck, validateRequest(CreateTicketDto), createTicket);

export default router;