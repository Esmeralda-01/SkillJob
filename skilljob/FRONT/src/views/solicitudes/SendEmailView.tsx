import { useParams } from "react-router-dom"

import DataSendForm from "@/components/solicitudes/DataSendForm"


export default function SendEmailView() {
    const params = useParams()
    const solicitudId = params.solicitudId!

    return <DataSendForm  offerId={solicitudId}/>
}
