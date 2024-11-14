import type { Request, Response, NextFunction } from "express";
import Offer, { IOffer } from "../models/Offer";

declare global{
    namespace Express {
        interface Request {
            offer: IOffer
        }
    }
}

export async function OfferExists(req: Request, res: Response, next: NextFunction) {
    try {
        const {offerId} = req.params
        const offer = await Offer.findById(offerId)
            if(!offer){
                const error = new Error('Oferta no encontrada')
                return res.status(400).json({error: error.message})
            }
        req.offer = offer
        next()
    } catch (error) {
        res.status(500).json({error:'Hubo un error'})
    }
}