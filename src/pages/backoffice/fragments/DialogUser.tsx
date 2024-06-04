import AccountFileds from "@/components/accountFields";
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@/utils/models";
import { Form } from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";

type DialogUserProps = {
  user: User
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  editUser: (user: User) => void
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(3, "Name must be al least 3 characters long"),
  gender: z.string()
}).required()

const DialogUser: React.FC<DialogUserProps> = ({ user, setOpenDialog, editUser }) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      gender: user.gender
    },
  })

  const handleEdit = (values: z.infer<typeof formSchema>) => {
    const userEdited = {
      id: user.id,
      gender: values.gender,
      name: values.name,
      email: values.email,
      status: user.status
    }
    setOpenDialog(false)
    editUser(userEdited)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{t("edit_account_btn")}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
          <AccountFileds form={form} />
          <DialogFooter>
            <Button type="button" className="w-full border-slate-400" variant="outline" onClick={() => {
              setOpenDialog(false)
              form.reset()
            }}>{t("cancel_btn")}</Button>
            <Button type="submit" className="w-full">{t("save")}</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default DialogUser