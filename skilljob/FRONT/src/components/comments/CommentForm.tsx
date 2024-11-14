import { FieldErrors, UseFormRegister } from "react-hook-form"
import { CommentFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type CommentFormProps = {
    errors: FieldErrors<CommentFormData>
    register: UseFormRegister<CommentFormData>
}

export default function CommentForm({errors, register} : CommentFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Comentar</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Haz un comentario sobre la oferta"
                    className="w-full p-3  border-gray-300 border"
                    {...register("content", {
                        required: "El contenido del comentario es obligatorio",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Calificación</label>
                <input
                    id="content"
                    type="number"
                    placeholder="Dale una calificación al servicio"
                    className="w-full p-3  border-gray-300 border"
                    {...register("content", {
                        required: "El contenido del comentario es obligatorio",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}