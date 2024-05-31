import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from 'react-router-dom'
import RotationDiv from './fragments/RotationDiv'
import BgImage from "./fragments/BgImage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GET_USER_LIST } from "@/utils/graphql/query"
import { useQuery } from "@apollo/client"
import { User } from "@/utils/models"
import { useState } from "react"

const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const {data} = useQuery<{users: { nodes: User[]}}>(GET_USER_LIST)

	const handleLogin = () => {
		const user = data!.users.nodes.find(res => res.email === form.email)
		if (user && user.status === 'active') navigate('/home')
		else if (user && user.status === 'inactive') console.log('user inactive') 
		else console.log('any user found')
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
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={form.email}
								onChange={(event) => setForm({ ...form, email: event.target.value})}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input 
								id="password" 
								type="password" 
								value={form.password}
								onChange={(event) => setForm({ ...form, password: event.target.value})}
							/>
						</div>
						<Button type="submit" className="w-full" onClick={handleLogin}>
							Login
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don't have an account?{" "}
						<span onClick={() => navigate("/signup")} className="ml-auto inline-block text-sm underline">
							Sign Up
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

export default Login;