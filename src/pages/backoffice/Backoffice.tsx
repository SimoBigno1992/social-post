import Header from "@/components/header"
import { useAtomValue } from 'jotai'
import storeAtom from '../../utils/store/index'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
} from "@/components/ui/table"
import { useTranslation } from "react-i18next";
import TableHeaderCustom from "./fragments/TableHeader"
import TableRowCustom from "./fragments/TableRowCustom"
import { useEffect, useState } from "react"
import { BASE_URL, BEARER_TOKEN } from "@/config.env"
import axios from "axios"
import { User } from "@/utils/models"
import TableFilter from "./fragments/TableFilter"
import PaginationCustom from "./fragments/PaginationCustom"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const Backoffice = () => {
  const store = useAtomValue(storeAtom)
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    status: ""
  })

  const { t } = useTranslation();

  useEffect(() => {
    getUsers(currentPage, perPage)
  }, [filters])

  const getUsers = (page: number, perPage: number) => {
    const config = {
      headers: {
        "Authorization": "Bearer " + BEARER_TOKEN
      }
    }
    
    let queryParams = "";

    if(filters.name) queryParams = queryParams + `&name=${filters.name}` 
    if(filters.gender) queryParams = queryParams + `&gender=${filters.gender}`
    if(filters.status) queryParams = queryParams + `&status=${filters.status}`

    axios.get(`${BASE_URL}/public/v2/users?page=${page}&per_page=${perPage}${queryParams}`, config)
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {

      })
  }

  const handlePagination = (page: number, perPage: number) => {
    setCurrentPage(page)
    setPerPage(perPage)
    getUsers(page, perPage)
  }

  return (
    <>
      <Header username={store.user!.name} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle>Admin Console</CardTitle>
            <CardDescription>
              {t("backoffice_subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <Input
                  placeholder={t("admin_filter_name")}
                  value={filters.name}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="h-8 w-[150px] lg:w-[250px]"
                />
                <TableFilter
                  setFilter={setFilters}
                  column="status"
                  title="Status"
                  options={[{value:"active", label: "Active"}, {value: "inactive", label: "Inactive"}]}
                  />
                <TableFilter
                  setFilter={setFilters}
                  column="gender"
                  title={t("gender")}
                  options={[{value:"male", label: t("male_label")}, {value: "female", label: t("female_label")}]}
                />
              </div>
            </div>
            <Table>
              <TableHeaderCustom />
              <TableBody>
                {users && users.length > 0 && users.map((user, index) => {
                  return <TableRowCustom key={index} user={user} />
                })}
              </TableBody>
            </Table>
            {users.length == 0 && <div className="flex flex-col items-center mt-10">
                <Search className="h-20 w-20 mb-2"></Search>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t("any_users")}</h3>
                <p className="text-muted-foreground">{t("any_users_subtitle")}</p>
              </div>}
          </CardContent>
          <CardFooter className="justify-end">
            <PaginationCustom perPage={perPage} currentPage={currentPage} handlePagination={handlePagination} />
          </CardFooter>
        </Card>
      </main>
    </>
  )
}

export default Backoffice