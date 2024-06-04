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

type TableRowCustomProps = {
  user: User
  editUser: (status: string, userId: number) => void
  deleteUser: (userId: number) => void
}

const TableRowCustom: React.FC<TableRowCustomProps> = ({ user, editUser, deleteUser }) => {
  const { t } = useTranslation();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => editUser(user.status == "active" ? "inactive" : "active", user.id)} >{user.status == "active" ? t("block_label") : t("activate_label")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteUser(user.id)}>{t("delete_account_btn")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default TableRowCustom