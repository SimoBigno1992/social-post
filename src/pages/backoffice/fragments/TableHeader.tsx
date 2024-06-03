import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTranslation } from "react-i18next";

const TableHeaderCustom = () => {
  const { t } = useTranslation();

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="hidden w-[100px] sm:table-cell">
          <span className="sr-only">img</span>
        </TableHead>
        <TableHead>{t("name")}</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Email</TableHead>
        <TableHead className="hidden md:table-cell">{t("gender")}</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default TableHeaderCustom