import { Request, Response } from 'express';
import { AppDataSource } from "../db";
import { Ticket } from "../models/entities/Ticket.entity";
import { CreateTicketDto } from "../models/requests/createTicket.dto";

const ticketRepository = AppDataSource.getRepository(Ticket)

export const fetchTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const ticket = await ticketRepository.findOneBy({ id: req.params.ticketId })

        if (!ticket) {
            res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {

    try {
        const dto: CreateTicketDto = req.body;

        const createdTicket = await ticketRepository
            .save(new Ticket(dto.vatin, dto.firstName, dto.lastName))

        if (!createdTicket) {
            res.status(404).json({ message: 'Ticket not created' });
        }

        res.status(201).json(createdTicket);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Server error', error });
    }
};