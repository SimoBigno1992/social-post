import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from 'react-router-dom'
import RotationDiv from './fragments/RotationDiv'
import BgImage from "./fragments/BgImage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const SignUp = () => {
	const navigate = useNavigate();

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
					<div className="grid gap-4">
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
					</div>
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