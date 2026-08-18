"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { brandsService } from "@/app/brands/brands.service"
import type { IBrandOption } from "@/app/brands/type"
import { categoriesService } from "@/app/categories/categories.service"
import type { ICategoryOption } from "@/app/categories/type"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { productsService } from "../products.service"
import type { IProduct, IProductCreateDTO } from "../type"

const productFormSchema = z.object({
  product_name: z.string().trim().min(2, "Product name must be at least 2 characters."),
  description: z.string().trim().optional(),
  price: z.string().min(1, "Price is required.").refine((value) => Number(value) >= 0, "Price must be 0 or greater."),
  discount: z.string().min(1, "Discount is required.").refine((value) => Number(value) >= 0, "Discount must be 0 or greater."),
  category: z.string().min(1, "Please select a category."),
  brand: z.string().min(1, "Please select a brand."),
  model_year: z.string().regex(/^\d+$/, "Model year must be a whole number.").refine((value) => Number(value) >= 1900 && Number(value) <= new Date().getFullYear() + 1, "Model year is not valid."),
  thumbnail: z.string().trim().url("Please enter a valid image URL.").optional().or(z.literal("")),
  stock: z.string().regex(/^\d+$/, "Stock must be a whole number.").refine((value) => Number(value) >= 0, "Stock must be 0 or greater."),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface UpdateProductFormProps {
  product: IProduct
}

const getFormValues = (product: IProduct): ProductFormValues => ({
  product_name: product.product_name,
  description: product.description ?? "",
  price: String(product.price),
  discount: String(product.discount),
  category: product.category._id,
  brand: product.brand._id,
  model_year: String(product.model_year),
  thumbnail: product.thumbnail ?? "",
  stock: String(product.stock),
})

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm<ProductFormValues>({ resolver: zodResolver(productFormSchema), defaultValues: getFormValues(product) })

  useEffect(() => {
    if (open) form.reset(getFormValues(product))
  }, [form, open, product])

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories-select-options"], queryFn: categoriesService.getCategoriesSelect, enabled: open,
  })
  const { data: brandsData, isLoading: isBrandsLoading } = useQuery({
    queryKey: ["brands-select-options"], queryFn: brandsService.getBrandsSelect, enabled: open,
  })
  const updateMutation = useMutation({
    mutationFn: (data: IProductCreateDTO) => productsService.updateById(product._id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success(response.message || "Product updated successfully.")
      setOpen(false)
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to update product. Please try again."),
  })

  const categories = (categoriesData?.data ?? []) as ICategoryOption[]
  const brands = (brandsData?.data ?? []) as IBrandOption[]
  const isOptionsLoading = isCategoriesLoading || isBrandsLoading

  const onSubmit = (values: ProductFormValues) => updateMutation.mutate({
    ...values,
    price: Number(values.price),
    discount: Number(values.discount),
    model_year: Number(values.model_year),
    stock: Number(values.stock),
    description: values.description || undefined,
    thumbnail: values.thumbnail || undefined,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
          <Pencil className="size-4" />
          <span className="sr-only">Edit {product.product_name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader><DialogTitle>Update Product</DialogTitle><DialogDescription>Update the product details below.</DialogDescription></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="product_name" render={({ field }) => <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField control={form.control} name="category" render={({ field }) => <FormItem><FormLabel>Category</FormLabel><Select value={field.value} onValueChange={field.onChange} disabled={isOptionsLoading}><FormControl><SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent>{categories.map((category) => <SelectItem key={category._id} value={category._id}>{category.category_name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
              <FormField control={form.control} name="brand" render={({ field }) => <FormItem><FormLabel>Brand</FormLabel><Select value={field.value} onValueChange={field.onChange} disabled={isOptionsLoading}><FormControl><SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Select brand" /></SelectTrigger></FormControl><SelectContent>{brands.map((brand) => <SelectItem key={brand._id} value={brand._id}>{brand.brand_name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField control={form.control} name="price" render={({ field }) => <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="discount" render={({ field }) => <FormItem><FormLabel>Discount</FormLabel><FormControl><Input type="number" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="stock" render={({ field }) => <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" min="0" step="1" {...field} /></FormControl><FormMessage /></FormItem>} />
            </div>
            <FormField control={form.control} name="model_year" render={({ field }) => <FormItem><FormLabel>Model Year</FormLabel><FormControl><Input type="number" min="1900" step="1" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="thumbnail" render={({ field }) => <FormItem><FormLabel>Thumbnail URL</FormLabel><FormControl><Input type="url" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="description" render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>} />
            <DialogFooter><Button type="submit" className="cursor-pointer" disabled={updateMutation.isPending || isOptionsLoading}>{updateMutation.isPending ? "Updating..." : "Save Changes"}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
