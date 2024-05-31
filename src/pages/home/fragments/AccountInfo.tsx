import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AccountInfo = () => {
	return (
		<Card className="bg-primary-foreground">
			<CardHeader>
				<CardTitle>Simone</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Email</p>
						<p className="text-sm text-muted-foreground">
							olivia.martin@email.com
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Gender</p>
						<p className="text-sm text-muted-foreground">
							M
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Status</p>
						<p className="text-sm text-muted-foreground">
							active
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">Number of Posts</p>
						<p className="text-sm text-muted-foreground">23</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default AccountInfo