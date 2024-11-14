// Request.ts
import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./User";

const reqStatus = {
    PENDIENTE: 'pendiente',
    ENPROCESO: 'enproceso',
    RECHAZADA: 'rechazada',
    FINZALIZADA: 'finalizada'
} as const
export type ReqStatus = typeof reqStatus[keyof typeof reqStatus]


export interface ISolcitud extends Document {
    offer: Schema.Types.ObjectId // Referencia a la oferta
    oferente: Types.ObjectId// ID del solicitante
    solicitante: Types.ObjectId// ID del oferente
    status: ReqStatus // Estados: pendiente, aceptada, en_proceso, rechazada, finalizada
    createdAt: Date
    finalizedAt: Date
}

const SolcitudSchema = new Schema({
    offer: {
        type: Schema.Types.ObjectId,
        ref: 'Offer',
        required: true
    },
    oferente: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    solicitante: {
        type: Types.ObjectId,
        ref: 'User',
        required: true

    },
    status: {
        type: String,
        enum: Object.values(reqStatus),
        default: reqStatus.PENDIENTE
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    finalizedAt: {
        type: Date,
        required: false
    }
})

const Solicitud = mongoose.model<ISolcitud>('Solicitud', SolcitudSchema);
export default Solicitud
