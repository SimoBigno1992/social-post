import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "@/utils/models"

type AccountProps = {
	user: User
	postsNumber: number
}

const AccountInfo: React.FC<AccountProps> = ({
	user, 
	postsNumber
}) => {
	return (
		<Card className="bg-primary-foreground">
			<CardHeader>
				<CardTitle>{user.name}</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Email</p>
						<p className="text-sm text-muted-foreground">
							{user.email}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Gender</p>
						<p className="text-sm text-muted-foreground">
							{user.gender}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Status</p>
						<p className="text-sm text-muted-foreground">
							{user.status}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Number of Posts</p>
						<p className="text-sm text-muted-foreground">{postsNumber}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default AccountInfo