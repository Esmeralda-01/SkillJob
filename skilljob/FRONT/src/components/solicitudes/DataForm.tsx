import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import { OfferFormData, SolicitudOffer } from '@/types/index'


export default function DataForm() {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="offerName" className="text-sm uppercase font-bold">
                    Correo
                </label>
                <input
                    id="email"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Ingresa tu correo"
                    
                />
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Número del cliente
                </label>
                <input
                    id="phone"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Número de telefono"
                    
                />
            </div>

        </>
    )
}