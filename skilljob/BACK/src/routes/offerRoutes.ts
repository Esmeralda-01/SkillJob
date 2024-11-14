import { Router } from "express";
import { body, param, query } from 'express-validator'
import { OfferController } from "../controllers/OfferController";
import { handleInputErrors } from "../middleware/validatio";
import { CommentController } from "../controllers/CommentController";
import { OfferExists } from "../middleware/offer";
import { commentBelongsToOffer, commentExists } from "../middleware/comment";
import { authenticate } from "../middleware/auth";


const router = Router()

router.use(authenticate)

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('El descripción es obligatorio'),
    handleInputErrors,
    OfferController.createOffer
)
router.get('/', OfferController.getAllOffers)

router.post('/search',
    body('searchTerm').notEmpty().withMessage('Debe proporcionar un término de búsqueda'),
    handleInputErrors,
    OfferController.searchOffers
)
router.get('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    OfferController.getOfferById)


router.param('offerId', OfferExists)

router.put('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('El descripción es obligatorio'),
    handleInputErrors,
    OfferController.updateOffer)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    OfferController.deleteOffer)

// Cambiar status
router.post('/:id/status',
    param('id').isMongoId().withMessage('ID no valido'),
    body('status')
        .notEmpty().withMessage('El contenido del es obligatorio'),
    handleInputErrors,
    OfferController.updateStatus
)

//Rutas de los comentarios


router.get('/:offerId/comentarios',
    CommentController.getOfferComments
)

router.param('commentId', commentExists)
router.param('commentId', commentBelongsToOffer)

router.get('/:offerId/comentarios/:commentId',
    param('commentId').isMongoId().withMessage('ID del comentario no válido'),
    handleInputErrors,
    CommentController.getCommentById
)

router.put('/:offerId/comentarios/:commentId',
    param('commentId').isMongoId().withMessage('ID del comentario no válido'),
    body('content')
        .notEmpty().withMessage('El contenido del es obligatorio'),
    handleInputErrors,
    CommentController.updateComment
)

router.delete('/:offerId/comentarios/:commentId',
    param('commentId').isMongoId().withMessage('ID del comentario no válido'),
    handleInputErrors,
    CommentController.deleteComment
)



export default router