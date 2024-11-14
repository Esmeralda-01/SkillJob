import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getOfferById } from "@/api/OfferAPI"
import AddCommentModal from "@/components/comments/AddCommentModal"
import CommentList from "@/components/comments/CommentList"


export default function OfferDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const offerId = params.offerId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editOffer', offerId],
        queryFn: () => getOfferById(offerId),
        retry: false
    })
    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to='/404' />
    if (data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + '?newComment=true')}
                >Agregar Comentario</button>
            </nav>
            <CommentList
            comments = {data.comments}/>
            <AddCommentModal/>
        </>
    )
}
