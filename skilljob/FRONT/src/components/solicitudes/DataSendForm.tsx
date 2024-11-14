import { Link, useNavigate } from 'react-router-dom'
import { Offer, OfferFormData, SolicitudOffer } from '@/types/index'
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendEmailRequest } from '@/api/SolicitudAPI';
import DataForm from './DataForm';
import { useForm } from 'react-hook-form';

type EditOfferFormProps = {
    data: SolicitudOffer
}


export default function DataSendForm({ data }: EditOfferFormProps) {
    /*const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        projectName: data.email,
        clientName: data.phone
    }})
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: sendEmailRequest,
        onError: (error) => {
           toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['offers']})
            toast.success(data)
        }
    })

    const handleForm = (formData: OfferFormData) => {
        const data = {
            formData
        }
        mutate(data)
    }*/
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Contactar con el solicitante</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario con tu datos de contacto</p>

                <nav className="my-5 ">
                    <Link
                        className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to='/request'
                    >Volver a solicitudes</Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <DataForm />
                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
