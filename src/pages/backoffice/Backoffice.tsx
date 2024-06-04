import Header from "@/components/header"
import { useAtomValue } from 'jotai'
import { user } from '../../utils/store/index'
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
  TableCell,
  TableRow,
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
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

const Backoffice = () => {
  const store = useAtomValue(user)
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    status: ""
  })

  const { t } = useTranslation();
  
  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        toast({
					title: "Ops...",
					description: t("error"),
					variant: "destructive"
				})
      })
  }

  const handlePagination = (page: number, perPage: number) => {
    setLoading(true)
    setCurrentPage(page)
    setPerPage(perPage)
    getUsers(page, perPage)
  }

  const editUser = (user: User) => {
    setLoading(true)
    const config = {
      headers: {
        "Authorization": "Bearer " + BEARER_TOKEN
      }
    }

    const body = {
      status: user.status,
      gender: user.gender,
      email: user.email,
      name: user.name
    }

    axios.put(`${BASE_URL}/public/v2/users/${user.id}`, body, config)
      .then(res => {
        getUsers(currentPage, perPage)
      })
      .catch(err => {
        setLoading(false)
        toast({
          title: "Ops...",
          description: t("error"),
          variant: "destructive"
        })
      })
  }

  const deleteUser = (userId: number) => {
    setLoading(true)
    const config = {
      headers: {
        "Authorization": "Bearer " + BEARER_TOKEN
      }
    }

    axios.delete(`${BASE_URL}/public/v2/users/${userId}`, config)
      .then(res => {
        getUsers(currentPage, perPage)
      })
      .catch(err => {
        setLoading(false)
        toast({
          title: "Ops...",
          description: t("error"),
          variant: "destructive"
        })
      })
  }

  const skeleton = () => {
    const elements: JSX.Element[] = [];
    for(let i=0; i < 5; i++) {
      elements.push( <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-12 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-12 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-12 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-12 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-12 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-12 w-full" />
        </TableCell>
      </TableRow>)
    }
    return elements
  }

  return (
    <>
      <Header username={store.user!.name} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Console</CardTitle>
            <CardDescription>
              {t("backoffice_subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>

            {/* FILTERS ROW FOR THE DATATABLE */}

            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center space-x-2" style={{overflow: "auto"}}>
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
                
            {/* TABLE */}

            <Table>
              <TableHeaderCustom />
              <TableBody>
                {loading ? <>{skeleton()}</>
                : users && users.length > 0 && users.map((user, index) => {
                  return <TableRowCustom key={index} user={user} editUser={editUser} deleteUser={deleteUser}/>
                })}
              </TableBody>
            </Table>

            {/* EMPTY STATE */}

            {users.length == 0 && !loading && <div className="flex flex-col items-center mt-10">
                <Search className="h-20 w-20 mb-2"></Search>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t("any_users")}</h3>
                <p className="text-muted-foreground">{t("any_users_subtitle")}</p>
              </div>}
          </CardContent>
          <CardFooter className="justify-end">
            <PaginationCustom perPage={perPage} currentPage={currentPage} usersLength={users.length} handlePagination={handlePagination} />
          </CardFooter>
        </Card>
      </main>
    </>
  )
}

export default Backoffice