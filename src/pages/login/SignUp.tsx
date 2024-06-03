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
import axios from "axios"
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useTranslation } from "react-i18next";

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	name: z.string().min(3, "Name must be al least 3 characters long"),
	gender: z.string(),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	confirmPassword: z.string().min(6, "Password must be at least 6 characters long")
})
.required()
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

const SignUp = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			gender: "",
			name: "",
			confirmPassword: ""
		},
	})

	const handleSignup = (values: z.infer<typeof formSchema>) => {
		const config = {
			headers: {
				"Authorization": "Bearer " + BEARER_TOKEN
			}
		}
		const body = {
			name: values.name,
			email: values.email,
			gender: values.gender,
			status: "active"
		}
		axios.post(`${BASE_URL}/public/v2/users`, body, config)
			.then(res => {
				toast({
					title: t("signup_success"),
					description: t("signup_success_subtitle"),
					action: <ToastAction altText="Go to Sing In" onClick={() => navigate("/login")}>{t("signup_success_action")}</ToastAction>,
				})
				form.reset()
			}).catch(err => {
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
					<CardTitle className="text-xl">{t("signup")}</CardTitle>
					<CardDescription>
						{t("signup_subtitle")}
					</CardDescription>
				</CardHeader>
				<CardContent>
				<Form {...form}>
							<form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
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
									name="name"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="name">{t("full_name_label")}</Label>
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
									name="gender"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="gender">{t("gender")}</Label>
											<FormControl>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<SelectTrigger>
														<SelectValue placeholder={t("select_gender_placeholder")} />
													</SelectTrigger>
													<SelectContent id="gender">
														<SelectGroup>
															<SelectItem value="male">{t("male_label")}</SelectItem>
															<SelectItem value="female">{t("female_label")}</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
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
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="confirm_password">{t("confirm_password_label")}</Label>
											<FormControl>
												<Input
													id="confirm_password"
													type="password"
													placeholder="******"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">{t("signup")}</Button>
							</form>
						</Form>
					<div className="mt-4 text-center text-sm cursor-pointer">
						{t("signup_goto")}{" "}
						<span onClick={()=>navigate("/login")} className="underline">
							{t("signin")}
						</span>
					</div>
				</CardContent>
			</Card>
			</RotationDiv>
		</div>
	)
}

export default SignUp;