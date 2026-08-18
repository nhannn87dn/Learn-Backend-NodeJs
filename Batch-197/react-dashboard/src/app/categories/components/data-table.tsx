"use client"

import { useEffect, useMemo, useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { EllipsisVertical, Pencil, Search, Trash2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CategoryFormDialog } from "./category-form-dialog"
import type { ICategory } from "@/app/categories/type"

interface CategoryTableProps {
  categories: ICategory[]
  searchQuery: string
  onSearch: (value: string) => void
  onDelete: (id: string) => void
  onEdit: (category: ICategory) => void
  onAdd: (values: { category_name: string; description: string; slug: string }) => void
}

export function CategoryTable({ categories, searchQuery, onSearch, onDelete, onEdit, onAdd }: CategoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [searchValue, setSearchValue] = useState(searchQuery)

  useEffect(() => {
    setSearchValue(searchQuery)
  }, [searchQuery])

  const columns = useMemo<ColumnDef<ICategory>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "category_name",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.category_name}</span>
          <span className="text-sm text-muted-foreground">{row.original.description}</span>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <Badge variant="secondary">{row.original.slug}</Badge>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <CategoryFormDialog category={row.original} onSubmit={async (values) => onEdit({ ...row.original, ...values })} submitLabel="Save Changes" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                <EllipsisVertical className="size-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(row.original)}>
                <Pencil className="mr-2 size-4" />
                Edit Category
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => onDelete(row.original._id)}>
                <Trash2 className="mr-2 size-4" />
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ], [onDelete, onEdit])

  const table = useReactTable({
    data: categories,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form
          className="flex flex-1 max-w-sm items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            onSearch(searchValue)
          }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchValue}
              onChange={(event) => {
                const nextValue = String(event.target.value)
                setSearchValue(nextValue)

                if (!nextValue.trim() && searchQuery) {
                  onSearch("")
                }
              }}
              className="pl-9 pr-9"
            />
            {!!searchValue && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setSearchValue("")
                  onSearch("")
                }}
              >
                <X className="size-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button type="submit" variant="outline" className="cursor-pointer">
            Search
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <CategoryFormDialog onSubmit={onAdd} submitLabel="Create Category" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="cursor-pointer">
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="cursor-pointer">
          Next
        </Button>
      </div>
    </div>
  )
}
