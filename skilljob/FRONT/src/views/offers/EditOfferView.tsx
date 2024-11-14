import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getOfferById } from "@/api/OfferAPI"
import EditOfferForm from "@/components/offers/EditOfferForm"


export default function EditOfferView() {
    const params = useParams()
    const offerId = params.offerId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editOffer', offerId],
        queryFn: () => getOfferById(offerId),
        retry: false
    })
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>
    if(data)return <EditOfferForm data={data} offerId={offerId}/>
}
