import { AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@radix-ui/react-avatar"
import avatar from '../../../assets/avatar.png'
import { Post, Comment } from "@/utils/models"
import { useEffect, useState } from "react"
import axios from "axios"
import { MessageCircle } from "lucide-react"

type PostCardProps = {
  post: Post
  userMail?: string
}

const PostCard: React.FC<PostCardProps> = ({post, userMail}) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    axios.get(`https://gorest.co.in/public/v2/posts/${post.id}/comments`)
      .then(response => {
        setComments(response.data)
      })
  }, [post])

  return (
    <Card x-chunk="dashboard-04-chunk-1" className="bg-primary-foreground">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
        <CardDescription>
					{userMail || ' - '}
				</CardDescription>
			</CardHeader>
			<CardContent>
        {post.body}
        <div className="flex gap-2 my-4 cursor-pointer" onClick={() => setShowComments(!showComments)}>
          <MessageCircle/>
          {comments.length}
        </div>
			</CardContent>
      <CardFooter className="flex flex-col items-start border-t bg-muted/50 px-6 py-3 gap-6">
        {showComments && comments.length > 0 && comments.map((comment, index) => {
          return <div key={index} className="flex flex-col border-t rounded-md bg-primary-foreground px-6 py-3 gap-4">
            <div className="flex flex-row gap-4 items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatar} />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold tex-sm">{comment.name}</p>
                <p className="text-sm text-muted-foreground">{comment.email}</p>
              </div>
            </div>
            {comment.body}
          </div>
        })}
        <div className="flex flex-row w-full items-center gap-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={avatar} />
          </Avatar>
          <Input placeholder="Type your comment here" />
          <Button type="submit">Reply</Button>
        </div>
      </CardFooter>
		</Card>
  )
}

export default PostCard