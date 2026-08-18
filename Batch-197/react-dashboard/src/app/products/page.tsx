import { BaseLayout } from "@/components/layouts/base-layout"
import { ProductTable } from "./components/ProductTable"
import { productsService } from "./products.service"
import { useQuery } from "@tanstack/react-query"
import type { IProduct } from "./type"
import type { ICategoryOption } from "../categories/type"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "react-router-dom"
import { categoriesService } from "../categories/categories.service"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import SearchProduct from "./components/SearchProduct"
import { brandsService } from "../brands/brands.service"
import type { IBrandOption } from "../brands/type"
import { AddProductForm } from "./components/AddProductForm"

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "right-ellipsis"]
  }

  if (currentPage >= totalPages - 2) {
    return ["left-ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return ["left-ellipsis", currentPage - 1, currentPage, currentPage + 1, "right-ellipsis"]
}

const ProductTableSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="border-b bg-muted/40 px-4 py-3">
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={`header-${index}`} className="h-4 w-full" />
            ))}
          </div>
        </div>

        <div className="p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-8 gap-4 items-center">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProductsPage = () => {
    //search query
  const [params, setParams] = useSearchParams()
  const searchQuery = params.get("search") || ""
  const pageQuery = params.get("page") || "1"
  const limitQuery = params.get("limit") || "10"
  const categoryQuery = params.get("category") || "all"
  const brandQuery = params.get("brand") || "all"

  const page = Number(pageQuery) || 1
  const limit = Number(limitQuery) || 10

  const setPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(params)
    nextParams.set("page", String(nextPage))
    nextParams.set("limit", String(limit))
    setParams(nextParams)
  }

  const handleSearch = (values: { search: string; category: string; brand: string }) => {
    const nextParams = new URLSearchParams(params)
    const nextSearch = values.search.trim()

    if (nextSearch) {
      nextParams.set("search", nextSearch)
    } else {
      nextParams.delete("search")
    }

    if (values.category && values.category !== "all") {
      nextParams.set("category", values.category)
    } else {
      nextParams.delete("category")
    }

    if (values.brand && values.brand !== "all") {
      nextParams.set("brand", values.brand)
    } else {
      nextParams.delete("brand")
    }

    nextParams.set("page", "1")
    nextParams.set("limit", String(limit))
    setParams(nextParams)
  }


    /*=== BEGIN GET PRODUCTS ===*/
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", searchQuery, pageQuery, limitQuery, categoryQuery, brandQuery],
    queryFn: () => productsService.getProducts({
      search: searchQuery,
      page,
      limit,
      category: categoryQuery === "all" ? '' : categoryQuery,
      brand: brandQuery === "all" ? '' : brandQuery
    }),
  });

  const { data: categoriesSelectData } = useQuery({
    queryKey: ["categories-select-options"],
    queryFn: () => categoriesService.getCategoriesSelect(),
  })

  const { data: brandsSelectData } = useQuery({
    queryKey: ["brands-select-options"],
    queryFn: () => brandsService.getBrandsSelect(),
  })

  const records = data?.data?.records || [] as IProduct[]
  const categoryOptions = (categoriesSelectData?.data || []) as ICategoryOption[]
  const brandOptions = (brandsSelectData?.data || []) as IBrandOption[]
  const totalPages = data?.data?.metadata?.totalPages || 1
  const currentPage = data?.data?.metadata?.page || page
  const visiblePages = getVisiblePages(currentPage, totalPages)
    /*=== END GET PRODUCTS ===*/
  if(isError){
    return (
      <BaseLayout title="Products" description="Manage your products">
        <div className="@container/main px-4 lg:px-6 ">
          <p className="text-red-500">Error: {error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      </BaseLayout>
    )
  }
  return (
    <BaseLayout title="Products" description="Manage your products">
        <div className="@container/main px-4 lg:px-6 ">
            {isLoading ? <ProductTableSkeleton /> : (
                <div className="flex flex-col gap-4">
                   <div className="flex gap-4 justify-between items-center">
                        <SearchProduct
                            brandOptions={brandOptions}
                            categoryOptions={categoryOptions}
                            searchQuery={searchQuery}
                            categoryQuery={categoryQuery}
                            brandQuery={brandQuery}
                            onSearch={handleSearch}
                        />
                        <AddProductForm />
                    </div>
                    <ProductTable data={records} />
                    {totalPages > 1 && (
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(event) => {
                                event.preventDefault()
                                if (currentPage > 1) {
                                  setPage(currentPage - 1)
                                }
                              }}
                              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>

                          {visiblePages.map((pageItem, index) => (
                            <PaginationItem key={`${pageItem}-${index}`}>
                              {typeof pageItem === "number" ? (
                                <PaginationLink
                                  href="#"
                                  isActive={pageItem === currentPage}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    setPage(pageItem)
                                  }}
                                  className="cursor-pointer"
                                >
                                  {pageItem}
                                </PaginationLink>
                              ) : (
                                <PaginationEllipsis />
                              )}
                            </PaginationItem>
                          ))}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(event) => {
                                event.preventDefault()
                                if (currentPage < totalPages) {
                                  setPage(currentPage + 1)
                                }
                              }}
                              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                </div>)}
        </div>
    </BaseLayout>
  )
}

export default ProductsPage
