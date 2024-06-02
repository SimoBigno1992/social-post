import { AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@radix-ui/react-avatar"
import avatar from '../../../assets/avatar.png'
import { Post, Comment } from "@/utils/models"
import { useEffect, useState } from "react"
import axios from "axios"
import { Facebook, Instagram, MessageCircle, Share2, TrendingUpIcon, Twitter } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import CommentBubble from "./CommentBubble"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

type PostCardProps = {
  post: Post
  userMail?: string
  username?: string
}

const formSchema = z.object({
	content: z.string().min(2, "Comment must have at least 2 characters.")
}).required()

const PostCard: React.FC<PostCardProps> = ({post, userMail, username}) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  content: ""
		},
	})

  useEffect(() => {
    setLoading(true)
    getComments()
  }, [post])

  const getComments = () => {
    const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
    axios.get(`${BASE_URL}/public/v2/posts/${post.id}/comments`, config)
      .then(response => {
        setComments(response.data.reverse())
        setLoading(false)
      })
  }

  const createComment = (values: z.infer<typeof formSchema>) => {
    const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
    const body = {
      post_id: post.id,
      email: userMail,
      name: username,
      body: values.content
    }

    axios.post(`${BASE_URL}/public/v2/posts/${post.id}/comments`, body, config)
      .then(response => {
        console.log(response)
        form.reset()
        getComments()
      })
      .catch(err => console.log(err))
  }

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
        <div className="flex gap-6">
          <div className="flex flex-row gap-2 my-4">
            <MessageCircle/>
            {comments.length}
          </div>
          <div className="flex flex-row gap-2 my-4 cursor-pointer" onClick={() => {}}>
            <DropdownMenu>
              <DropdownMenuTrigger><Share2 /></DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-0 flex flex-row" side="right">
                <DropdownMenuItem><Facebook/></DropdownMenuItem>
                <DropdownMenuItem><Twitter/></DropdownMenuItem>
                <DropdownMenuItem><Instagram/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
			</CardContent>
      <CardFooter className="flex flex-col items-start border-t bg-muted/50 px-6 py-6 gap-4">
        {loading ? <Skeleton className="w-[100px] h-[20px] rounded-full" /> : comments.length > 1 && <Button variant="link" className="text-muted-foreground h-1 px-0" onClick={() => setShowComments(!showComments)}>{showComments ? "Hide comments" : "Show more comments"}</Button> }
        {loading ? <>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          </> : comments.length > 0 && !showComments ? (
          <>
            <CommentBubble comment={comments[0]} index={0}/>
          </>
        ) : showComments && comments.length > 0 && comments.map((comment, index) => {
          return <CommentBubble comment={comment} index={index}/>
        })}
        <div className="flex flex-row w-full items-center gap-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={avatar} />
          </Avatar>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createComment)} className="w-full items-center flex gap-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        id="content"
                        type="text"
                        placeholder="Type your comment here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Reply</Button>
            </form>
          </Form>
        </div>
      </CardFooter>
		</Card>
  )
}

export default PostCard