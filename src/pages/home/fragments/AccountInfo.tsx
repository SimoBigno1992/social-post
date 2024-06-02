import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SetAtom, User } from "@/utils/models"
import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate } from "react-router-dom"

type AccountProps = {
	user: User
	postsNumber?: number
	setStore: SetAtom<[update: unknown], void>
}

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	name: z.string().min(3, "Name must be al least 3 characters long"),
	gender: z.string()
}).required()

const AccountInfo: React.FC<AccountProps> = ({
	user,
	postsNumber,
	setStore
}) => {
	const navigate = useNavigate();
	const [edit, setEdit] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: user.email,
			name: user.name,
			gender: user.gender
		},
	})

	const handleEdit = (values: z.infer<typeof formSchema>) => {
		setLoading(true)
		editUser(values)
	}

	const editUser = (values: z.infer<typeof formSchema>) => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}

		const body = {
			name: values.name,
			email: values.email,
			gender: values.gender
		}

		axios.put(`${BASE_URL}/public/v2/users/${user.id}`, body, config)
			.then(res => {
				setEdit(!edit)
				setStore({ user: res.data })
				setLoading(false)
			})
			.catch(err => {
				toast({
					title: "Ops...",
					description: "Some error occurred",
					variant: "destructive"
				})
			})
	}

	const deleteUser = () => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}

		axios.delete(`${BASE_URL}/public/v2/users/${user.id}`, config)
			.then(res => {
				navigate("/login")
			})
			.catch(err => {
				toast({
					title: "Ops...",
					description: "Some error occurred",
					variant: "destructive"
				})
			})
	}

	return (
		<Card className="bg-primary-foreground">
			{loading ? <>
				<CardHeader>
					<CardTitle><Skeleton className="h-7 w-full" /></CardTitle>
				</CardHeader>
				<CardContent className="grid gap-8">
					<div className="flex gap-4 flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
					<div className="flex gap-4 flex-col">
            <Skeleton className="h-4 w-fill" />
            <Skeleton className="h-4 w-full" />
          </div>
					<div className="flex gap-4 flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
					<div className="flex gap-4 flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
				</CardContent>
			</>: 
				!edit ? <>
				<CardHeader>
					<CardTitle>{user.name}</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-8">
					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<p className="text-sm text-muted-foreground">Email</p>
							<p className="text-sm font-medium leading-none">
								{user.email}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<p className="text-sm text-muted-foreground">Gender</p>
							<p className="text-sm font-medium leading-none">
								{user.gender}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<p className="text-sm text-muted-foreground">Status</p>
							<p className="text-sm font-medium leading-none">
								{user.status}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<p className="text-sm text-muted-foreground">Number of Posts</p>
							<p className="text-sm font-medium leading-none">{postsNumber}</p>
						</div>
					</div>
				</CardContent>
			</> :
				<>
					<CardHeader>
						<CardTitle>Edit your Account</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="name">Full Name</Label>
											<FormControl>
												<Input
													id="name"
													type="text"
													placeholder="Charles Leclerc"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="email">Email</Label>
											<FormControl>
												<Input
													id="email"
													type="email"
													placeholder="m@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="gender">Gender</Label>
											<FormControl>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<SelectTrigger>
														<SelectValue placeholder="Select a gender" />
													</SelectTrigger>
													<SelectContent id="gender">
														<SelectGroup>
															<SelectItem value="male">Male</SelectItem>
															<SelectItem value="female">Female</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">Save</Button>
							</form>
						</Form>
					</CardContent>
				</>}
			{!edit && <CardFooter className="grid gap-4">
				<div className="flex items-center justify-center gap-4">
					<Button className="w-full border-slate-400" variant="outline" onClick={() => setEdit(!edit)}>Edit Account</Button>
				</div>
				<div className="flex items-center justify-center gap-4">
					<Button className="w-full" variant="destructive" onClick={() => deleteUser()}>Delete Account</Button>
				</div>
			</CardFooter>}
		</Card>
	)
}

export default AccountInfo