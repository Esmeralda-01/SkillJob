
import { updateSolicitudStatusOffer } from "@/api/SolicitudAPI"
import { SolicitudOffer } from "@/types/index"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Fragment } from "react/jsx-runtime"


type SolicitudCardProps = {
    solicitud: SolicitudOffer
}

export default function SolicitudCard({ solicitud }: SolicitudCardProps) {
    const { projectName } = solicitud.offer;
    const solicitudId = solicitud._id;
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { mutate: updateStatus } = useMutation({
        mutationFn: (action: 'aceptar' | 'rechazar') => updateSolicitudStatusOffer(solicitudId, action),
        onSuccess: (data, action) => {
            toast.success(data.message);
            console.log(action)
            if (action === 'aceptar') {
                navigate(`/solicitudes/${solicitudId}/send-email`);
            }
            queryClient.invalidateQueries({queryKey: ['solicitudes']})

        },
        onError: () => {
            toast.error('Error al actualizar la solicitud');
        },
    });

    const handleAccept = () => updateStatus('aceptar');
    const handleReject = () => updateStatus('rechazar');
    return (
        <li
            className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
            <div
                className=" min-w-0 flex flex-col gap-y-4">
                <p
                    className="text-xl font-bold text-slate-600 text-left"
                >Nombre de la oferta: {projectName}</p>

            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                            <Menu.Item>
                                <button
                                    id="rechazar"
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                    onClick={() => handleAccept()}
                                >
                                    Aceptar
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    id="rechazar"
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                    onClick={() => handleReject()}
                                >
                                    Rechazar
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}
