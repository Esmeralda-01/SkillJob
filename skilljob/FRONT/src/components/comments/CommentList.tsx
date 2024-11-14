import { Comment } from "@/types/index"
import CommentCard from "./CommentCard"

type CommentListProps = {
    comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
    console.log(comments)
    return (
        <>

            <h2 className="text-5xl font-black my-10">Comentarios</h2>
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <div className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                    <ul className='mt-5 space-y-5'>
                        {comments.length === 0 ? (
                            <li className="text-gray-500 text-center pt-3">No hay comentarios</li>
                        ) : (
                            comments.map(comment => (
                                <CommentCard key={comment._id} comment={comment}/>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}
