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
import { UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Plus, Trash } from "lucide-react"
import { useState } from "react"
import React from "react"
import axios from "axios"
import { useAtom } from "jotai"
import storeAtom from '../../../utils/store/index'

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

type PostCreationProps = {
	createPost: (values: z.infer<typeof formSchema>, form: UseFormReturn<{
			title: string;
			content: string;
	}, any, undefined>) => void
}

const PostCreation = React.forwardRef<HTMLElement, PostCreationProps>(({createPost}, ref) => {
	const [showForm, setShowForm] = useState<boolean>(false)
	const [store] = useAtom(storeAtom)
	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
			content: ""
    },
  })

	const handleCreation = (values: z.infer<typeof formSchema>) => {
		createPost(values, form)
	}

	return (
		<div ref={ref} >
			<Card x-chunk="dashboard-04-chunk-1" className="bg-primary-foreground">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<div className="flex flex-col">  
						<CardTitle>
							Create New Post
						</CardTitle>
						<CardDescription>
							What are you thinking about?
						</CardDescription>
					</div>
					<Button size="icon" className="h-10 w-10 mt-0" variant={showForm ? "destructive" : "default"} onClick={() => {
						if (showForm) form.reset()
						setShowForm(!showForm)
					}}>
						{!showForm ? <Plus className="h-4 w-4" /> : <Trash className="h-4 w-4"/>}
					</Button>
				</CardHeader>
				{showForm && <CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleCreation)} className="space-y-8">
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
				</CardContent>}
			</Card>
		</div>
	)
})

export default PostCreation