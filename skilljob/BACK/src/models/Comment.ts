import mongoose, { Schema, Document, Types, PopulatedDoc } from 'mongoose'
import { IUser } from './User'

export interface IComment extends Document {
    text: string
    rating: number
    manager: PopulatedDoc<IUser & Document>
    offer: Types.ObjectId
    createdAt: Date
}

const CommentSchema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    offer: {
        type: Types.ObjectId,
        ref: 'Offer'
    },
    rating: { type: Number, 
        required: false, 
        min: 1, max: 5 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

const Comment = mongoose.model<IComment>('Comment', CommentSchema)
export default Comment