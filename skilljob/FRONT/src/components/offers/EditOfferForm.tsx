import OfferForm from './OfferForm'
import { Link, useNavigate } from 'react-router-dom'
import { Offer, OfferFormData} from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateOffer } from '@/api/OfferAPI'

type EditOfferFormProps = {
    data: OfferFormData
    offerId: Offer['_id']
}

export default function EditOfferForm({data, offerId} : EditOfferFormProps) {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})
    
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateOffer,
        onError: (error) => {
           toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['offers']})
            queryClient.invalidateQueries({queryKey: ['editOffer', offerId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: OfferFormData) => {
        const data = {
            formData,
            offerId
        }
        mutate(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Oferta</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar la oferta</p>

                <nav className="my-5 ">
                    <Link
                        className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to='/'
                    >Volver a Publicaciones</Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <OfferForm
                    register={register}
                    errors={errors}
                    />
                    
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
