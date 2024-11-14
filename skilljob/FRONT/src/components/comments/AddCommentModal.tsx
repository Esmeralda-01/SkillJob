import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import CommentForm from './CommentForm';
import { CommentFormData } from '@/types/index';
import { createComment } from '@/api/CommentAPI';
import { toast } from 'react-toastify';

export default function AddCommentModal() {

    const navigate = useNavigate()
    //Leer si modal existe
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalComment = queryParams.get('newComment')
    const show = modalComment ? true : false

    //Obtener offerId
    const params = useParams()
    const offerId = params.offerId!

    const initialValues: CommentFormData = {
        content: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createComment,
        onError: (error) => {
            toast.error(error.message)
            reset()
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true })
        }
    })

    const handleCreateComment = (formData: CommentFormData) => {
        const data ={
            formData,
            offerId
        }
        //console.log(data)
        mutate(data)
    }
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nuevo Cometario
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">un comentario</span>
                                    </p>
                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateComment)}
                                        noValidate
                                    >
                                        <CommentForm
                                            register={register}
                                            errors={errors}
                                        />
                                        <input
                                            type="submit"
                                            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                            value='Guardar Comentario'
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}