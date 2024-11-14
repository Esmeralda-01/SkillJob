import api from "@/lib/axios"
import { dashboardOfferSchema, Offer, OfferFormData } from "@/types/index"
import { isAxiosError } from "axios"

export async function createOffer(formData: OfferFormData) {
    try {
        const { data } = await api.post('/ofertas', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getOffers() {
    try {
        const { data } = await api('/ofertas')
        const response = dashboardOfferSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getOfferById(id: Offer['_id']) {
    try {
        const { data } = await api(`/ofertas/${id}`)
        return data
        //const response = editProjectSchema.safeParse(data)
        //if(response.success) {
        //  return response.data
        //}
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type OfferAPIType = {
    formData: OfferFormData
    offerId: Offer['_id']
}

export async function updateOffer({ formData, offerId }: OfferAPIType) {
    try {
        const { data } = await api.put<string>(`/ofertas/${offerId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteOffer(id: Offer['_id']) {
    try {
        const url = `/ofertas/${id}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export const searchOffers = async (searchTerm: string): Promise<Offer[]> => {
    try {
        const { data } = await api.post('/ofertas/search', { searchTerm });
        return data; // Retorna las ofertas que coinciden con el término de búsqueda
    } catch (error) {
        console.error("Error en searchOffers:", error);
        throw new Error('Error al realizar la búsqueda');
    }
}