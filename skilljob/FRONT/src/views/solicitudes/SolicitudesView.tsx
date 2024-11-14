
import { useMutation } from "@tanstack/react-query"
import SolicitudList from '@/components/solicitudes/SolicitudList'
import { getSolicitudes } from '@/api/SolicitudAPI'
import { Solicitud } from '@/types/index'
import { useEffect, useState } from "react"

export default function SolicitudesView() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    // Configuración de la mutación para obtener todas las solicitudes
    const { mutate: fetchSolicitudes, isError } = useMutation({
        mutationFn: getSolicitudes,
        onSuccess: (data) => {
            setSolicitudes(data);
        },
        onError: (error) => {
            console.error("Error al obtener las solicitudes:", error);
        }
    });

    // Llama a la función de mutación cuando el componente se monta
    useEffect(() => {
        fetchSolicitudes();
    }, [fetchSolicitudes]);
    if (isError) return <p>Error al cargar las solicitudes</p>;

    return (
        <>
            <h1 className="text-5xl font-black">Mis Solicitudes</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Aqui puedes ver el estatus de tus solicitudes</p>
            <SolicitudList solicitudes={solicitudes} canEdit={true} />
        </>
    )

}
