import type { Request, Response } from 'express'
import Comment, { IComment } from '../models/Comment'
import { Types } from 'mongoose'
import Offer from '../models/Offer'
import { buildCheckFunction } from 'express-validator'

type CommentParams = {
    commentId: Types.ObjectId
}

export class CommentController {

    static getOfferComments = async (req: Request, res: Response) => {
        try {
            const comments = await Comment.find({ offer: req.offer.id }).populate('offer')
            res.json(comments)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
    static getCommentById = async (req: Request, res: Response) => {
        try {
            res.json(req.comment)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateComment = async (req: Request, res: Response) => {
        try {
            req.comment.text = req.body.text
            await req.comment.save()

            res.send('Comentario actualizado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
    /*const comment = await Comment.findById(req.comment.id)
                  .populate({ path: 'completedBy.user', select: 'id name email' })
                   .populate({ path: 'notes', populate: { path: 'createdBy', select: 'id name email' } })*/
    static deleteComment = async (req: Request<CommentParams>, res: Response) => {
        try {
            req.offer.comments = req.offer.comments.filter(comment => comment.toString() !== 
            req.comment.id.toString())
            await Promise.allSettled([req.comment.deleteOne(), req.offer.save()])
            res.send('Comentario eliminado')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
}