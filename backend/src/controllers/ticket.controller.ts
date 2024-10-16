import { Request, Response } from 'express';
import { AppDataSource } from "../db";
import { Ticket } from "../models/entities/Ticket.entity";
import { CreateTicketDto } from "../models/requests/createTicket.dto";
import QRCode from "qrcode";

const ticketRepository = AppDataSource.getRepository(Ticket)

export const fetchTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const ticket = await ticketRepository.findOneBy({ id: req.params.ticketId })

        if (!ticket) {
            res.status(404).json({ message: 'Ticket not found' });
            return;
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTotalNumberOfTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const total = await ticketRepository.count()

        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



export const createTicket = async (req: Request, res: Response): Promise<void> => {

    try {
        const dto: CreateTicketDto = req.body;

        //check if already exists more than 3 tickets for OIB
        const numOfTickets = await ticketRepository.countBy({ vatin: dto.vatin });
        if (numOfTickets == 3) {
            res.status(400).json({ message: 'Three tickets already generated.' });
            return;
        }

        const createdTicket = await ticketRepository
            .save(new Ticket(dto.vatin, dto.firstName, dto.lastName))

        if (!createdTicket) {
            res.status(404).json({ message: 'Ticket not created' });
            return;
        }

        const url = process.env.CLIENT_URL + "/" + createdTicket.id;
        const qrCodeImage = await QRCode.toDataURL(url);

        res.status(201).json({ qrcode: qrCodeImage });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Server error', error });
    }
};