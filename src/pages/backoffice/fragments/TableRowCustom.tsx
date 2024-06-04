import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import avatar from '../../../assets/avatar.png'
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next";
import { User } from "@/utils/models"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import DialogUser from "./DialogUser"
import { Dialog } from "@/components/ui/dialog"


type TableRowCustomProps = {
  user: User
  editUser: (user: User) => void
  deleteUser: (userId: number) => void
}

const TableRowCustom: React.FC<TableRowCustomProps> = ({ user, editUser, deleteUser }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} />
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">
        {user.name}
      </TableCell>
      <TableCell>
        <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell className="hidden md:table-cell">{user.gender}</TableCell>
      <TableCell>

        {/* DROPDOWN ACTIONS ON ACCOUNT ROW - EDIT, BLOCK/UNBLOCK, DELETE */}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>{t("edit_account_btn")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              let backupUser = user
              backupUser.status = user.status == "active" ? "inactive" : "active"
              editUser(backupUser)}
            } >{user.status == "active" ? t("block_label") : t("activate_label")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>{t("delete_account_btn")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ALERT BEFORE DELETING ACCOUNT ACTION */}

        <div className="flex items-center justify-center gap-4">
          <AlertDialog open={open}>
            <AlertDialogContent className="bg-primary-foreground">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("delete_title")}</AlertDialogTitle>
                <AlertDialogDescription>{t("delete_admin_subtitle")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>{t("cancel_btn")}</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  setOpen(false)
                  deleteUser(user.id)}
                }>{t("continue_btn")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* DIALOG TO EDIT ACCOUNT INFORMATIONS */}

        <div className="flex items-center justify-center gap-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogUser user={user} setOpenDialog={setOpenDialog} editUser={editUser}/>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default TableRowCustom