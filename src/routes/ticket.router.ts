import express from "express";
import { createTicket, fetchTicket } from "../controllers/ticket.controller";
import { validateRequest } from "../middleware/validateRequest";
import { CreateTicketDto } from "../models/requests/createTicket.dto";

const router = express.Router();

router.get("/:ticketId", fetchTicket);
router.post("/", validateRequest(CreateTicketDto), createTicket);

export default router;