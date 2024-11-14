import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { RequestController} from '../controllers/RequestController';


const router = Router();

// Crear solicitud de servicio
router.post("/", authenticate, RequestController.createServiceRequest); //crear una solicitud 
router.post("/:solicitudId/status", authenticate, RequestController.updateSolicitudStatusOffer);// aceptar o rechazar oferta
router.get('/', authenticate, RequestController.getAllSolicitudes)// consultar todas las solicitudes por usuario
router.put('/:solicitudId/:offerId/end', authenticate, RequestController.endSolicitud);
router.post('/:solicitudId/send-email', authenticate, RequestController.sendEmailRequest);


export default router;
