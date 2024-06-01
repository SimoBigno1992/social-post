import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "@/utils/models"
import { useState } from "react"

type AccountProps = {
	user: User
	postsNumber?: number
}

const AccountInfo: React.FC<AccountProps> = ({
	user, 
	postsNumber
}) => {
	const [edit, setEdit] = useState<boolean>(false)

	return (
		<Card className="bg-primary-foreground">
			{!edit ? <><CardHeader>
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
			</CardContent></> : 
			<>
				<CardHeader>
					<CardTitle>Edit your Account</CardTitle>
				</CardHeader>
			</>}
			<CardFooter className="grid gap-4">
				<div className="flex items-center justify-center gap-4">
					<Button className="w-full border-slate-400" variant="outline" onClick={() => setEdit(!edit)}>Edit Account</Button>
				</div>
				<div className="flex items-center justify-center gap-4">
					<Button className="w-full" variant="destructive">Delete Account</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default AccountInfo