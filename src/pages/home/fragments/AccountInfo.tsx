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
import { useTranslation } from "react-i18next";
import { AlertDialog,AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import AccountFileds from "@/components/accountFields"

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
	const { t } = useTranslation();
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
					description: t("error"),
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
					description: t("error"),
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
							<p className="text-sm text-muted-foreground">{t("gender")}</p>
							<p className="text-sm font-medium leading-none">
								{user.gender}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<p className="text-sm text-muted-foreground">Status</p>
							<Badge>{user.status}</Badge>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<p className="text-sm text-muted-foreground">{t("number_of_posts")}</p>
							<p className="text-sm font-medium leading-none">{postsNumber}</p>
						</div>
					</div>
				</CardContent>
			</> :
				<>
					<CardHeader>
						<CardTitle>{t("edit_account")}</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
								<AccountFileds form={form}/>
								<Button type="submit" className="w-full">{t("save")}</Button>
								<Button type="button" className="w-full border-slate-400" variant="outline"onClick={() => {
									setEdit(!edit)
									form.reset()
								}}>{t("cancel_btn")}</Button>
							</form>
						</Form>
					</CardContent>
				</>}
			{!edit && <CardFooter className="grid gap-4">
				<div className="flex items-center justify-center gap-4">
					<Button className="w-full border-slate-400" variant="outline" onClick={() => setEdit(!edit)}>{t("edit_account_btn")}</Button>
				</div>
				<div className="flex items-center justify-center gap-4">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className="w-full" variant="destructive">{t("delete_account_btn")}</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="bg-primary-foreground">
							<AlertDialogHeader>
								<AlertDialogTitle>{t("delete_title")}</AlertDialogTitle>
								<AlertDialogDescription>{t("delete_subtitle")}</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>{t("cancel_btn")}</AlertDialogCancel>
								<AlertDialogAction onClick={() => deleteUser()}>{t("continue_btn")}</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardFooter>}
		</Card>
	)
}

export default AccountInfo