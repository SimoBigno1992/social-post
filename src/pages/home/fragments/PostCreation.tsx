import { Button } from "@/components/ui/button"
import { 
	Card, 
	CardContent, 
	CardDescription,
	CardHeader, 
	CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

const formSchema = z.object({
	title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
	content: z.string().min(2, {
    message: "Post content must be at least 2 characters.",
  }).max(400, {
		message: "Post content can have max 400 characters.",
	})
})

const PostCreation = () => {

	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
			content: ""
    },
  })

	const createPost = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<Card x-chunk="dashboard-04-chunk-1" className="bg-primary-foreground">
			<CardHeader>
				<CardTitle>Create New Post</CardTitle>
				<CardDescription>
					What are you thinking about?
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(createPost)} className="space-y-8">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Post title here" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea placeholder="Type your content here" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>Publish</Button>
					</form>
				</Form>
			</CardContent>
		</Card>

	)
}

export default PostCreation