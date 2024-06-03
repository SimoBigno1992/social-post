import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react"
import React from "react"
import { useTranslation } from "react-i18next";

type PaginationCustomProps = {
  perPage: number
  currentPage: number
  handlePagination: (currentPage: number, perPage: number) => void
}

const PaginationCustom: React.FC<PaginationCustomProps> = ({perPage, currentPage, handlePagination}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t("row_per_page_label")}</p>
          <Select
            value={perPage.toString()}
            onValueChange={(value) => handlePagination(currentPage, Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t("page_label")} {currentPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePagination(1, perPage)}
            disabled={currentPage == 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0"
            onClick={() => handlePagination(currentPage - 1, perPage)}
            disabled={currentPage == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0"
            onClick={() => handlePagination(currentPage + 1, perPage)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePagination(currentPage + 10, perPage)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaginationCustom