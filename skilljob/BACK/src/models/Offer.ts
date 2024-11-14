import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IComment } from "./Comment";
import { IUser } from "./User";
import {  ISolcitud } from "./Solcitud";

const offerStatus = {
    PUBLISHED: 'publicada',
    PAUSED: 'pausada',
    BUSY: 'ocuapda',
    FREE: 'libre'
} as const

export type OfferStatus = typeof offerStatus[keyof typeof offerStatus]

export interface IOffer extends Document {
    projectName: string
    clientName: string
    description: string
    status: OfferStatus // Agrega el campo status
    comments: PopulatedDoc<IComment & Document>[]
    manager: PopulatedDoc<IUser & Document>
    solicitudes: PopulatedDoc<ISolcitud & Document>[]
}
const OfferSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(offerStatus),
        default: offerStatus.PAUSED
    },
    comments: [
        {
            type: Types.ObjectId,
            ref: 'Comment'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    solicitudes: [
        {
            type: Types.ObjectId,
            ref: 'Solicitud'
        }
    ],
}, { timestamps: true })

const Offer = mongoose.model<IOffer>('Offer', OfferSchema)
export default Offer
// trim quita espación al incio y al final