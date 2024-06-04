import AccountFileds from "@/components/accountFields";
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@/utils/models";

type DialogUserProps = {
  user: User
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(3, "Name must be al least 3 characters long"),
  gender: z.string()
}).required()

const DialogUser: React.FC<DialogUserProps> = ({ user }) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      gender: user.gender
    },
  })

  const handleEdit = (values: z.infer<typeof formSchema>) => { }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit User profile</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
          <AccountFileds form={form} />
          <DialogFooter>
            <Button type="submit" className="w-full">{t("save")}</Button>
            <Button type="button" className="w-full border-slate-400" variant="outline" onClick={() => {
              // setEdit(!edit)
              form.reset()
            }}>{t("cancel_btn")}</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default DialogUser