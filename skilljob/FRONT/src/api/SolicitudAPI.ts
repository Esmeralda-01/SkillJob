import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Solicitud } from "../types";


export const requestService = async (offerId: string) => {
    try {
        const response = await api.post('/solicitudes', { ofertaId: offerId });
        return response.data;
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export const getSolicitudes = async () => {
    const response = await api.get('/solicitudes');
    return response.data;
}
export async function updateSolicitudStatusOffer(id: Solicitud['_id'], action: string) {
    try {
        const response = await api.post(`/solicitudes/${id}/status`, { action });
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Enviar datos de contacto por email
export const sendEmailRequest = async (solicitudId: string, email: string, phone?: string) => {
    try {
        const response = await api.post(`/solicitudes/${solicitudId}/send-email`, { email, phone });
    return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}