import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { CommentFormData, Offer } from "../types";

type CommentAPI ={
    formData: CommentFormData,
    offerId: Offer['_id']
}

export async function createComment({formData, offerId}: Pick<CommentAPI, 'formData'|'offerId'>) {
    try {
        const url = `/ofertas/${offerId}/comentarios`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}