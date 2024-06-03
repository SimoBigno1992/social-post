import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from 'react-router-dom'
import RotationDiv from './fragments/RotationDiv'
import background from '../../assets/background.jpg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useSetAtom } from 'jotai'
import storeAtom from '../../utils/store/index'
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import { toast } from "@/components/ui/use-toast"
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long")
}).required()

const Login = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const setStore = useSetAtom(storeAtom)
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	})

	const handleLogin = (values: z.infer<typeof formSchema>) => {
		setLoading(true)
		login(values)
	}

	const login = (values: z.infer<typeof formSchema>) => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
		axios.get(`${BASE_URL}/public/v2/users?email=${values.email}`, config)
			.then(response => {
				setLoading(false)
				const user = response.data
				if (user.length > 0 && user[0].status === 'active') {
					setStore({user: user[0]})
					if (isAdmin) {
						navigate('/backoffice')
					} else {
						navigate('/home')
					}
				}
				else if (user.length > 0 && user[0].status === 'inactive') {
					toast({
						title: t("user_inactive"),
						description: t("user_inactive_description"),
						variant: "destructive" 
					})
				}
				else {
					toast({
						title: t("user_not_found"),
						description: t("user_not_found_description"),
						variant: "destructive" 
					})
				}
			}).catch(err => {
				setLoading(false)
				toast({
					title: "Ops...",
					description: t("error"),
					variant: "destructive" 
				})
			})
	}

	return (
		<div className="w-full" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}>
			<RotationDiv>
				<Card className="mx-auto max-w-sm bg-primary-foreground" style={{background: 'transparent', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px'}}>
					<CardHeader>
						<CardTitle className="text-2xl">{t("login")}</CardTitle>
						<CardDescription>
							{t("login_subtitle")}
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
													placeholder="******"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex items-center space-x-2">
									<Label htmlFor="is-admin">{t("are_admin")}</Label>
									<Switch 
										id="is-admin"
										checked={isAdmin}
										onCheckedChange={() => setIsAdmin(!isAdmin)}
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t("login")}</Button>
							</form>
						</Form>
						<div className="mt-4 text-center text-sm">
							{t("login_goto")}{" "}
							<span onClick={() => navigate("/signup")} className="ml-auto inline-block text-sm underline cursor-pointer">
								{t("signup")}
							</span>
						</div>
					</CardContent>
				</Card>
			</RotationDiv>
		</div>
	)
}

export default Login;