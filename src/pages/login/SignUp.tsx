import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from 'react-router-dom'
import RotationDiv from './fragments/RotationDiv'
import BgImage from "./fragments/BgImage"
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

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	name: z.string().min(3, "Name must be al least 3 characters long"),
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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			confirmPassword: ""
		},
	})

	const handleSignup = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<RotationDiv>
				<Card className="mx-auto max-w-sm bg-primary-foreground">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
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
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="confirm_password">Confirm Password</Label>
											<FormControl>
												<Input
													id="confirm_password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">Sign Up</Button>
							</form>
						</Form>
					{/* <div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Charles Leclerc"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" required/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirm_password">Confirm Password</Label>
							<Input id="confirm_password" type="password" required/>
						</div>
						<Button type="submit" className="w-full">
							Create an account
						</Button>
					</div> */}
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<span onClick={()=>navigate("/login")} className="underline">
							Sign in
						</span>
					</div>
				</CardContent>
			</Card>
			</RotationDiv>
			<div className="hidden bg lg:block flex">
				<BgImage/>
			</div>
		</div>
	)
}

export default SignUp;