import type { Request, Response, NextFunction } from 'express'
import Comment, { IComment } from '../models/Comment'

declare global {
    namespace Express {
        interface Request {
            comment: IComment
        }
    }
}

export async function commentExists( req: Request, res: Response, next: NextFunction ) {
    try {
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)
        if(!comment) {
            const error = new Error('Comentario no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.comment = comment
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}

export function commentBelongsToOffer(req: Request, res: Response, next: NextFunction ) {
    if(req.comment.offer.toString() !== req.offer.id.toString()) {
        const error = new Error('Acción no válida')
        return res.status(400).json({error: error.message}) 
    }
    next()
}
/*
export function hasAuthorization(req: Request, res: Response, next: NextFunction ) {
    if( req.user.id.toString() !== req.project.manager.toString() ) {
        const error = new Error('Acción no válida')
        return res.status(400).json({error: error.message}) 
    }
    next()
}*/
