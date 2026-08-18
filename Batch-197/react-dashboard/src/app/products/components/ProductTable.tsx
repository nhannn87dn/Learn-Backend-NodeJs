"use client"

import { useMemo } from "react"
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { IProduct } from "../type"
import { UpdateProductForm } from "./UpdateProductForm"
import { DeleteProduct } from "./DeleteProduct"


interface ProductTableProps {
	data: IProduct[]
}

export function ProductTable({ data }: ProductTableProps) {
	const columns = useMemo<ColumnDef<IProduct>[]>(() => [
		{
			accessorKey: "thumbnail",
			header: "Thumbnail",
			cell: ({ row }) => <span><img width={50} height={50} src={row.original.thumbnail} alt={row.original.product_name} /></span>,
		},
		{
			accessorKey: "product_name",
			header: "Product Name",
            cell: ({ row }) => <span className="font-semibold">{row.original.product_name}</span>,
		},
		{
			accessorKey: "price",
			header: "Price",
			cell: ({ row }) => row.original.price.toLocaleString(),
		},
		{
			accessorKey: "category",
			header: "Category",
            cell: ({ row }) => row.original.category.category_name,
		},
		{
			accessorKey: "brand",
			header: "Brand",
            cell: ({ row }) => row.original.brand.brand_name,
		},
		{
			accessorKey: "model_year",
			header: "Model Year",
		},
		
		{
			accessorKey: "stock",
			header: "Stock",
		},
		{
			id: "action",
			header: "Action",
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<UpdateProductForm product={row.original} />
					<DeleteProduct product={row.original} />
				</div>
			),
		},
	], [])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="w-full space-y-4">
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
									No products found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
