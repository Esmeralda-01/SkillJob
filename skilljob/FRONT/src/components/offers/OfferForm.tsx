import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import { OfferFormData } from '@/types/index'

type OfferFormProps = {
    register: UseFormRegister<OfferFormData>
    errors: FieldErrors<OfferFormData>
}

export default function OfferForm({ errors, register } : OfferFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="offerName" className="text-sm uppercase font-bold">
                    Nombre de la Oferta
                </label>
                <input
                    id="offerName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre de la oferta"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />
                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />
                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Descripción de la Oferta"
                    {...register("description", {
                        required: "Una descripción de la oferta es obligatoria"
                    })}
                />
                  {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}