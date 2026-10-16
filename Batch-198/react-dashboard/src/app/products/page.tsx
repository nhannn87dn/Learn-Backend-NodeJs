"use client"

import { useEffect, useMemo, useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal, Pencil, Plus, RotateCcw, Search, Trash2 } from "lucide-react"
import { useSearchParams } from "react-router-dom"

import { toast } from "sonner"

import { ProductCreateDialog } from "./components/product-create-dialog"
import { ProductEditDialog } from "./components/product-edit-dialog"

import { BaseLayout } from "@/components/layouts/base-layout"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ENV } from "@/config/env"

type Product = {
  _id: string
  product_name: string
  category: {
    _id: string
    category_name: string
  }
  brand?: {
    _id: string
    brand_name: string
  } | null
  description?: string
  discount?: number
  model_year?: number
  price: number
  stock: number
  thumbnail: string
}

type TProductResponse = {
  data: Product[]
  metadata: {
    totalPages: number
    page: number
    limit: number
    totalRecords: number
  }
}

type FilterOption = {
  _id: string
  name: string
}

type RawFilterOption = {
  _id: string
  name?: string
  category_name?: string
  brand_name?: string
}

type OptionsResponse = {
  data: RawFilterOption[]
}


const ProductsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [productResponse, setProductResponse] = useState<TProductResponse | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([])
  const [brandOptions, setBrandOptions] = useState<FilterOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const page = Math.max(Number(searchParams.get("page")) || 1, 1)
  const limit = Math.max(Number(searchParams.get("limit")) || 10, 1)
  const searchQuery = searchParams.get("search") || ""
  const categoryQuery = searchParams.get("category") || ""
  const brandQuery = searchParams.get("brand") || ""
  const totalPages = productResponse?.metadata.totalPages ?? 1

  const [searchInput, setSearchInput] = useState(searchQuery)
  const [categoryInput, setCategoryInput] = useState(categoryQuery)
  const [brandInput, setBrandInput] = useState(brandQuery)

  useEffect(() => {
    setSearchInput(searchQuery)
    setCategoryInput(categoryQuery)
    setBrandInput(brandQuery)
  }, [brandQuery, categoryQuery, searchQuery])

  useEffect(() => {
    const controller = new AbortController()

    const fetchFilterOptions = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          fetch(`${ENV.API_URL}/v1/categories`, { signal: controller.signal }),
          fetch(`${ENV.API_URL}/v1/brands`, { signal: controller.signal }),
        ])

        if (!categoriesResponse.ok || !brandsResponse.ok) {
          throw new Error("Unable to load filter options")
        }

        const [categories, brands] = await Promise.all([
          categoriesResponse.json() as Promise<OptionsResponse>,
          brandsResponse.json() as Promise<OptionsResponse>,
        ])

        setCategoryOptions(categories.data.map((option) => ({
          _id: option._id,
          name: option.name ?? option.category_name ?? "",
        })))
        setBrandOptions(brands.data.map((option) => ({
          _id: option._id,
          name: option.name ?? option.brand_name ?? "",
        })))
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setError(error instanceof Error ? error.message : "Unable to load filter options")
        }
      }
    }

    fetchFilterOptions()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        })

        if (searchQuery) query.set("search", searchQuery)
        if (categoryQuery) query.set("category", categoryQuery)
        if (brandQuery) query.set("brand", brandQuery)

        const response = await fetch(`${ENV.API_URL}/v1/products?${query.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Unable to load products")
        }

        const data = await response.json()
        setProductResponse(data.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }

        setError(error instanceof Error ? error.message : "Unable to load products")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    };

    fetchProducts();

    return () => controller.abort()
  }, [brandQuery, categoryQuery, limit, page, searchQuery, refreshKey]);

  const goToPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set("page", String(nextPage))
    nextParams.set("limit", String(limit))
    setSearchParams(nextParams)
  }

  const handleSearch = () => {
    const nextParams = new URLSearchParams(searchParams)

    if (searchInput.trim()) {
      nextParams.set("search", searchInput.trim())
    } else {
      nextParams.delete("search")
    }

    if (categoryInput) {
      nextParams.set("category", categoryInput)
    } else {
      nextParams.delete("category")
    }

    if (brandInput) {
      nextParams.set("brand", brandInput)
    } else {
      nextParams.delete("brand")
    }

    nextParams.set("page", "1")
    nextParams.set("limit", String(limit))
    setSearchParams(nextParams)
  }

  const resetFilters = () => {
    setSearchInput("")
    setCategoryInput("")
    setBrandInput("")

    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete("search")
    nextParams.delete("category")
    nextParams.delete("brand")
    nextParams.set("page", "1")
    nextParams.set("limit", String(limit))
    setSearchParams(nextParams)
  }

  const handleDelete = async () => {
    if (!productToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`${ENV.API_URL}/v1/products/${productToDelete._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Unable to delete product")
      }

      toast.success("Product deleted successfully")
      setProductToDelete(null)

      // Nếu xóa hết bản ghi của trang cuối thì lùi về trang trước, ngược lại làm tươi danh sách
      if (productResponse?.data.length === 1 && page > 1) {
        goToPage(page - 1)
      } else {
        setRefreshKey((key) => key + 1)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete product")
    } finally {
      setIsDeleting(false)
    }
  }

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => <img src={row.original.thumbnail} alt={row.original.product_name} className="w-12 h-12 object-cover rounded" />,
      },
      {
        accessorKey: "product_name",
        header: "Product Name",
        cell: ({ row }) => <span className="font-medium">{row.original.product_name}</span>,
      },
      { 
        accessorKey: "category", 
        header: "Category",
        cell: ({ row }) => <span className="font-medium">{row.original.category.category_name}</span>,
     },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      { accessorKey: "stock", header: "Stock" },
     
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 pr-4">
          
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setProductToEdit(row.original)}
            >
              <Pencil className="size-4" />
              <span className="sr-only">Edit product</span>
            </Button>
             <Button onClick={() => setProductToDelete(row.original)} variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <Trash2 className="size-4" />
              <span className="sr-only">Delete product</span>
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: productResponse?.data || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <BaseLayout title="Products" description="Manage your products and their properties">
      <div className="@container/main px-4 pb-6 lg:px-6">
        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Tìm sản phẩm..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryInput} onValueChange={setCategoryInput}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={brandInput} onValueChange={setBrandInput}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Tất cả thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  {brandOptions.map((brand) => (
                    <SelectItem key={brand._id} value={brand._id}>{brand.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="size-4" />
                Tìm kiếm
              </Button>
              <Button variant="outline" onClick={resetFilters} disabled={isLoading}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="size-4" />
                Add product
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border bg-card">
            {error && <p className="p-4 text-sm text-destructive">{error}</p>}
            {isLoading && <p className="p-4 text-sm text-muted-foreground">Loading products...</p>}
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-muted/40 hover:bg-muted/40">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div id="pagination" className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {productResponse?.data.length ?? 0} of {productResponse?.metadata.totalRecords ?? 0} products
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => goToPage(page - 1)} disabled={isLoading || page <= 1} aria-label="Previous page">
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={pageNumber === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => goToPage(pageNumber)}
                  disabled={isLoading}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </Button>
              ))}
              <Button variant="outline" size="icon" onClick={() => goToPage(page + 1)} disabled={isLoading || page >= totalPages} aria-label="Next page">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        onCreated={() => {
          if (page === 1) setRefreshKey((key) => key + 1)
          else goToPage(1)
        }}
      />

      <ProductEditDialog
        product={productToEdit}
        onOpenChange={(open) => {
          if (!open) setProductToEdit(null)
        }}
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        onUpdated={() => setRefreshKey((key) => key + 1)}
      />

      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setProductToDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
            <AlertDialogDescription>
              Sản phẩm "{productToDelete?.product_name}" sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault()
                handleDelete()
              }}
            >
              {isDeleting ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </BaseLayout>
  )
}

export default ProductsPage