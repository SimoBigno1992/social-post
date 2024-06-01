import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from 'react-router-dom'
import RotationDiv from './fragments/RotationDiv'
import BgImage from "./fragments/BgImage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "@/utils/models"
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
import axios from 'axios'
import { useAtom } from 'jotai'
import storeAtom from '../../utils/store/index'
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long")
}).required()

const Login = () => {
	const [store, setStore] = useAtom(storeAtom)
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	})

	const handleLogin = (values: z.infer<typeof formSchema>) => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
		axios.get(`${BASE_URL}/public/v2/users?email=${values.email}`, config)
			.then(response => {
				const user = response.data
				if (user.length > 0 && user[0].status === 'active') {
					setStore({user: user[0]})
					navigate('/home')
				}
				else if (user.length > 0 && user[0].status === 'inactive') {
					toast({
						title: "User Inactive",
						description: "Your account is temporary disabled",
						variant: "destructive" 
					})
				}
				else {
					toast({
						title: "User Not Found",
						description: "Any account exists with this email",
						variant: "destructive" 
					})
				}
			}).catch(err => {
				toast({
					title: "Ops...",
					description: "Some error occurred",
					variant: "destructive" 
				})
			})
	}

	return (
		<div
			className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<RotationDiv>
				<Card className="mx-auto max-w-sm bg-primary-foreground">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
									name="password"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="password">Password</Label>
											<FormControl>
												<Input
													id="password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">Login</Button>
							</form>
						</Form>
						<div className="mt-4 text-center text-sm">
							Don't have an account?{" "}
							<span onClick={() => navigate("/signup")} className="ml-auto inline-block text-sm underline cursor-pointer">
								Sign Up
							</span>
						</div>
					</CardContent>
				</Card>
			</RotationDiv>
			<div className="hidden bg lg:block flex">
				<BgImage />
			</div>
		</div>
	)
}

export default Login;