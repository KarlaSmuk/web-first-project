import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnauthorizedError) {
        res.status(401).json({ error: 'Unauthorized access' });
    }
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};