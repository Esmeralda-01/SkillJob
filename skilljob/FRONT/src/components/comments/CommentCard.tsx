
import { Comment } from "@/types/index"

type CommentCardProps = {
    comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
            <div className=" min-w-0 flex flex-col gap-y-4">
                <p className="text-slate-500">
                    {comment.content}</p>
            </div>

        </li>
    )
}
