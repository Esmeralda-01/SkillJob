import type { Request, Response } from 'express';
import Offer from '../models/Offer';
import Solcitud from '../models/Solcitud';
import User from '../models/User';
import mongoose from 'mongoose';
import Solicitud from '../models/Solcitud';
import Comment from '../models/Comment';
import { AuthEmail } from '../emails/AuthEmail';
import { ContacEmail } from '../emails/ContacEmail';


export class RequestController {

    static createServiceRequest = async (req: Request, res: Response) => {
        try {
            // Obtener IDs del solicitante y la oferta desde el cuerpo de la petición
            const { ofertaId } = req.body;

            // Verificar que existan el solicitante y la oferta
            const solicitante = await User.findById(req.user.id);
            const oferta = await Offer.findById(ofertaId);

            if (!solicitante) {
                return res.status(404).json({ message: "Solicitante no encontrado." });
            }
            if (!oferta) {
                return res.status(404).json({ message: "Oferta no encontrada." });
            }
            const solicitudExistente = await Solcitud.findOne({
                solicitante: req.user.id,
                offer: ofertaId,
                status: { $in: ["pendiente", "en proceso"] },
            })
            if (solicitudExistente) {
                return res.status(400).json({
                    message: "Ya existe una solicitud pendiente o en progreso para esta oferta.",
                })
            }
            // Crear la nueva solicitud con estado inicial "Pendiente"
            const nuevaSolicitud = new Solcitud({
                solicitante: req.user.id,
                oferente: oferta.manager, // Asumiendo que el campo usuario en oferta es el oferente
                offer: ofertaId
            });
            // Guardar la solicitud en la base de datos
            const solicitudGuardada = await nuevaSolicitud.save();
            oferta.solicitudes.push(solicitudGuardada.id)
            oferta.save()
            // Responder con la solicitud creada y su estado "Pendiente"
            return res.status(201).json({
                message: "Solicitud creada exitosamente. Revisa tus solicitudes",
                solicitud: solicitudGuardada,
            });
        } catch (error) {
            console.error("Error al crear la solicitud:", error);
            return res.status(500).json({
                message: "Hubo un problema al crear la solicitud. Por favor, intenta de nuevo.",
            })
        }
    }
    static sendEmailRequest = async (req: Request, res: Response) => {
        try {
            // Obtener IDs del solicitante y la oferta desde el cuerpo de la petición
            const { solicitudId } = req.params;
            const { email, phone } = req.body;
            // Verificar que existan el solicitante y la oferta
            const solicitud = await Solcitud.findById(solicitudId)
            if (!solicitud) {
                return res.status(404).json({ message: 'Solicitud no encontrada.' });
            }
            if (solicitud.status !== 'enproceso') {
                return res.status(400).json({ message: 'La solicitud no está en estado "en proceso".' });
            }
            if (solicitud.oferente._id.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Solo el oferente puede enviar los datos de contacto.' });
            }
            const solicitante = await User.findById(solicitud.solicitante._id);
            if (!solicitante) {
                return res.status(404).json({ message: 'Solicitante no encontrado.' });
            }
            const oferente = await User.findById(solicitud.oferente._id);
            if (!oferente) {
                return res.status(404).json({ message: 'Oferente no encontrado.' });
            }
            await ContacEmail.sendDataOffer({
                email: solicitante.email,
                name: solicitante.name,
                oferenteEmail: email, // Correo del oferente
                oferentePhone: phone || 'No disponible', /// Si tienes el teléfono
            });
            return res.status(200).json({
                message: 'Correo enviado exitosamente con los datos de contacto del oferente.',
            });
        } catch (error) {
            console.error("Error al crear la solicitud:", error);
            return res.status(500).json({
                message: "Hubo un problema al crear la solicitud. Por favor, intenta de nuevo.",
            });
        }
    }
    static updateSolicitudStatusOffer = async (req: Request, res: Response) => {
        try {
            const { solicitudId } = req.params; // ID de la solicitud a actualizar
            const { action } = req.body; // ID del oferente y la acción a realizar (aceptar o rechazar)

            // Buscar la solicitud en la base de datos
            const solicitud = await Solcitud.findById(solicitudId);

            if (!solicitud) {
                return res.status(404).json({ message: "Solicitud no encontrada." });
            }

            // Verificar que el usuario que realiza la acción es el oferente de la solicitud
            if (solicitud.oferente.toString() !== req.user.id) {
                return res.status(403).json({ message: "No tienes permiso para modificar esta solicitud." });
            }
            if (solicitud.status === "rechazada" && action === "aceptar") {
                return res.status(400).json({ message: "No se puede aceptar una solicitud que ya ha sido rechazada." });
            }

            // Procesar la acción del oferente
            if (action === "aceptar") {
                solicitud.status = "enproceso";
            } else if (action === "rechazar") {
                solicitud.status = "rechazada";
                solicitud.finalizedAt = new Date(); // Registrar la fecha de finalización en caso de rechazo
            } else {
                return res.status(400).json({ message: "Acción no válida. Usa 'aceptar' o 'rechazar'." });
            }

            // Guardar los cambios en la solicitud
            const solicitudActualizada = await solicitud.save();

            return res.status(200).json({
                message: `Solicitud ${action === "aceptar" ? "aceptada" : "rechazada"} exitosamente.`,
                solicitud: solicitudActualizada,
            });
        } catch (error) {
            console.error("Error al actualizar la solicitud:", error);
            return res.status(500).json({
                message: "Hubo un problema al actualizar la solicitud. Por favor, intenta de nuevo.",
            });
        }
    }
    static getAllSolicitudes = async (req: Request, res: Response) => {
        try {
            const solicitudes = await Solcitud.find({
                $or: [
                    {
                        oferente: { $in: req.user.id }
                    },
                    {
                        solicitante: { $in: req.user.id }
                    }
                ]
            }).populate('offer')
            res.json(solicitudes)
        } catch (error) {
            console.log(error)
        }
    }
    static endSolicitud = async (req: Request, res: Response) => {
        try {
            const { solicitudId, offerId } = req.params
            const { comentario, calificacion } = req.body; // Recibe los datos para finalizar la solicitud
            // ID del usuario que está finalizando la solicitud (el solicitante)

            // Verificar que la solicitud exista y sea de este usuario
            const solicitud = await Solicitud.findById(solicitudId).populate('solicitante oferente offer');
            if (!solicitud) {
                return res.status(404).json({ message: 'Solicitud no encontrada.' });
            }
            if (solicitud.solicitante._id.toString() !== req.user.id) {
                return res.status(403).json({ message: 'No tienes permiso para finalizar esta solicitud.' });
            }
            if (solicitud.status === "finalizada") {
                return res.status(400).json({ message: "Acción incorrecta" });
            }

            // Actualizar el estado de la solicitud a 'finalizada'
            solicitud.status = 'finalizada';
            solicitud.finalizedAt = new Date();

            // Si se proporciona un comentario y una calificación, agregarlos a la oferta
            if (comentario || calificacion) {
                const nuevoComentario = new Comment({
                    text: comentario || '',
                    rating: calificacion || null,
                    manager: req.user.id,
                    offer: offerId
                });

                // Guardar el nuevo comentario
                const comentarioGuardado = await nuevoComentario.save();

                // Actualizar la oferta con el nuevo comentario
                const oferta = await Offer.findById(solicitud.offer);
                oferta.comments.push(comentarioGuardado.id);
                await oferta.save();
            }
            // Guardar los cambios de la solicitud
            await solicitud.save();

            // Responder con la solicitud finalizada
            return res.status(200).json({
                message: 'Solicitud finalizada correctamente.',
                solicitud: solicitud,
            });
        } catch (error) {
            console.error("Error al finalizar la solicitud:", error);
            return res.status(500).json({
                message: "Hubo un problema al finalizar la solicitud. Por favor, intenta de nuevo.",
            });
        }
    }
}