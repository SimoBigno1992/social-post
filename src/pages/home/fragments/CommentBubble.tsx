import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Comment } from "@/utils/models"
import avatar from '../../../assets/avatar.png'

type CommentBubbleProps = {
  comment: Comment
  index: number
}

const CommentBubble: React.FC<CommentBubbleProps>= ({comment, index}) => {
  return (
    <div key={index} className="flex flex-row gap-4 items-start">
      <Avatar className="h-10 w-10 mt-2">
        <AvatarImage src={avatar} />
      </Avatar>
      <div className="flex flex-col gap-4 items-start border-t rounded-xl bg-primary-foreground px-6 py-3">
        <div >
          <div className="flex flex-col">
            <p className="font-semibold tex-sm">{comment.name}</p>
            <p className="text-sm text-muted-foreground">{comment.email}</p>
          </div>
        </div>
        {comment.body}
      </div>
    </div>
  )
}

export default CommentBubble