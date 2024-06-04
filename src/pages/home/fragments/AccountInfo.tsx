import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import AccountFileds from "@/components/accountFields"
import { useAtom } from "jotai"
import { user } from "@/utils/store"

type AccountProps = {
	postsNumber?: number
}

const formSchema = z.object({
	email: z.string().email("Invalid email address"),
	name: z.string().min(3, "Name must be al least 3 characters long"),
	gender: z.string()
}).required()

/* **
	ACCOUNT INFO BOX IN HOME PAGE
** */
const AccountInfo: React.FC<AccountProps> = ({
	postsNumber
}) => {
	const [store, setStore] = useAtom(user)
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [edit, setEdit] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: store.user.email,
			name: store.user.name,
			gender: store.user.gender
		},
	})

	useEffect(() => {
		if (edit) {
			form.reset({
				email: store.user.email,
				name: store.user.name,
				gender: store.user.gender
			});
		}
	}, [edit, store.user, form]);

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

		axios.put(`${BASE_URL}/public/v2/users/${store.user.id}`, body, config)
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

		axios.delete(`${BASE_URL}/public/v2/users/${store.user.id}`, config)
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
			
			{/* LOADING STATE */}
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
			</> :
				!edit ? <>
					
					{/* ACCOUNT BOX INFO */}
					<CardHeader>
						<CardTitle>{store.user.name}</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-8">
						<div className="flex items-center gap-4">
							<div className="grid gap-1">
								<p className="text-sm text-muted-foreground">Email</p>
								<p className="text-sm font-medium leading-none">
									{store.user.email}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="grid gap-1">
								<p className="text-sm text-muted-foreground">{t("gender")}</p>
								<p className="text-sm font-medium leading-none">
									{store.user.gender}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="grid gap-1">
								<p className="text-sm text-muted-foreground">Status</p>
								<Badge>{store.user.status}</Badge>
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
						{/* EDIT (FORM) STATUS FOR ACCOUNT BOX */}
						<CardHeader>
							<CardTitle>{t("edit_account")}</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
									<AccountFileds form={form}/>
									<Button type="submit" className="w-full">{t("save")}</Button>
									<Button type="button" className="w-full border-slate-400" variant="outline" onClick={() => {
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

				{/* ALERT DIALOG BEFORE DELETING ACCOUNT */}
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