import type { Request, Response } from "express"
import Offer from "../models/Offer"

export class OfferController {

    static createOffer = async (req: Request, res: Response) => {
        const project = new Offer(req.body)
        // Asigna un manager
        project.manager = req.user.id
        try {
            await project.save()
            res.send('Oferta creada')

        } catch (error) {
            console.log(error)
        }
    }
    static getAllOffers = async (req: Request, res: Response) => {
        try {
            const offers = await Offer.find({})
            /*onst offers = await Offer.find({
                $or: [
                    { manager: { $in: req.user.id } }
                ]
            })*/
            res.json(offers)
        } catch (error) {
            console.log(error)

        }
    }
    static getOfferById = async (req: Request, res: Response) => {
        // ver el id en la terminal console.log(req.params)
        const { id } = req.params
        try {
            const offer = await Offer.findById(id).populate('comments')
            if (!offer) {
                const error = new Error('Oferta no encontrada')
                return res.status(400).json({ error: error.message })
            }
            //quien puede ver los detalles
            if (offer.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Acción no válida')
                return res.status(404).json({ error: error.message })
            }
            res.json(offer)
        } catch (error) {
            console.log(error)

        }
    }
    static updateOffer = async (req: Request, res: Response) => {
        // ver el id en la terminal console.log(req.params)
        const { id } = req.params
        try {
            const offer = await Offer.findById(id)
            //quien puede ver los detalles
            if (!offer) {
                const error = new Error('Oferta no encontrada')
                return res.status(400).json({ error: error.message })
            }
            if (offer.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Acción no válida')
                return res.status(404).json({ error: error.message })
            }
            offer.clientName = req.body.clientName
            offer.projectName = req.body.projectName
            offer.description = req.body.description
            await offer.save()
            res.send('Oferta actualizada')
        } catch (error) {
            console.log(error)

        }
    }
    static deleteOffer = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const offer = await Offer.findById(id)
            //quien puede ver los detalles
            if (!offer) {
                const error = new Error('Oferta no encontrada')
                return res.status(400).json({ error: error.message })
            }
            if (offer.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Acción no válida')
                return res.status(404).json({ error: error.message })
            }
            res.send('Oferta eliminada')
            await offer.deleteOne()
            res.send('Oferta Eliminado')
        } catch (error) {
            console.log(error)

        }
    }
    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.offer.status = status
            await req.offer.save()
            res.send('Oferta aactualizada')
        } catch (error) {
            console.log(error)

        }
    }
    static searchOffers = async (req: Request, res: Response) => {
        const { searchTerm } = req.body; // Obtiene el término de búsqueda desde query
    
        try {
            if (!searchTerm || typeof searchTerm !== "string") {
                return res.status(400).json({ error: "Debe proporcionar un término de búsqueda" });
            }
    
            // Convierte el término en un array de palabras
            const words = searchTerm.split(" ").map(word => word.trim()).filter(word => word.length > 0);
    
            // Construye un criterio de búsqueda para coincidir en projectName o description
            const searchCriteria = {
                $or: [
                    { projectName: { $regex: words.join("|"), $options: "i" } },
                    { description: { $regex: words.join("|"), $options: "i" } }
                ]
            };
    
            // Realizamos la búsqueda con los criterios especificados
            const offers = await Offer.find(searchCriteria);
    
            // Validamos si se encontraron resultados
            if (!offers || offers.length === 0) {
                return res.status(404).json({ error: "No se encontraron ofertas con los criterios especificados" });
            }
    
            // Enviamos las ofertas encontradas como respuesta
            res.json(offers);
        } catch (error) {
            console.error("Error al buscar ofertas:", error);
            res.status(500).json({ error: "Error en el servidor al buscar ofertas" });
        }
    }
}