import { SolicitudOffer } from "@/types/index"
import SolicitudCard from './SolicitudCard'

type SolicitudListProps = {
    solicitudes: SolicitudOffer[]
    canEdit: boolean
}

type GroupedSolicitudes = {
    [key: string]: SolicitudOffer[]
}

const initialStatusGroups: GroupedSolicitudes = {
    pendiente: [],
    enproceso: [],
    rechazada: [],
    finalizada: []
}

const statusStyles: { [key: string]: string } = {
    pendiente: 'border-t-slate-500',
    enproceso: 'border-t-green-500',
    rechazada: 'border-t-orange-500',
    finalizada: 'border-t-red-500'
}
export const statusTranslations: { [key: string]: string } = {
    pendiente: 'Pendiente',
    enproceso: 'En Proceso',
    rechazada: 'Rechazada',
    finalizada: 'Finalizada',
}

export default function SolicitudList({ solicitudes, canEdit }: SolicitudListProps) {

    const groupedSolicitudes = solicitudes.reduce((acc, solicitud) => {
        let currentGroup = acc[solicitud.status] ? [...acc[solicitud.status]] : [];
        currentGroup = [...currentGroup, solicitud]
        return { ...acc, [solicitud.status]: currentGroup };
    }, initialStatusGroups)


    return (
        <>
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedSolicitudes).map(([status, solicitudes]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3
                            className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]} `}
                        >{statusTranslations[status]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {solicitudes.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No hay solicitudes</li>
                            ) : (
                                solicitudes.map(solicitud => <SolicitudCard solicitud={solicitud} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}