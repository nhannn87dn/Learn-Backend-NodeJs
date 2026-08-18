"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { brandsService } from "@/app/brands/brands.service"
import type { IBrandOption } from "@/app/brands/type"
import { categoriesService } from "@/app/categories/categories.service"
import type { ICategoryOption } from "@/app/categories/type"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { productsService } from "../products.service"
import type { IProductCreateDTO } from "../type"

const productFormSchema = z.object({
  product_name: z.string().trim().min(2, "Product name must be at least 2 characters."),
  description: z.string().trim().optional(),
  price: z.string().min(1, "Price is required.").refine((value) => Number(value) >= 0, "Price must be 0 or greater."),
  discount: z.string().min(1, "Discount is required.").refine((value) => Number(value) >= 0, "Discount must be 0 or greater."),
  category: z.string().min(1, "Please select a category."),
  brand: z.string().min(1, "Please select a brand."),
  model_year: z.string().regex(/^\d+$/, "Model year must be a whole number.").refine(
    (value) => Number(value) >= 1900 && Number(value) <= new Date().getFullYear() + 1,
    "Model year is not valid.",
  ),
  thumbnail: z.string().trim().url("Please enter a valid image URL.").optional().or(z.literal("")),
  stock: z.string().regex(/^\d+$/, "Stock must be a whole number.").refine((value) => Number(value) >= 0, "Stock must be 0 or greater."),
})

type ProductFormValues = z.infer<typeof productFormSchema>

const defaultValues: ProductFormValues = {
  product_name: "",
  description: "",
  price: "0",
  discount: "0",
  category: "",
  brand: "",
  model_year: String(new Date().getFullYear()),
  thumbnail: "",
  stock: "0",
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unable to create product. Please try again."

export function AddProductForm() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories-select-options"],
    queryFn: categoriesService.getCategoriesSelect,
    enabled: open,
  })
  const { data: brandsData, isLoading: isBrandsLoading } = useQuery({
    queryKey: ["brands-select-options"],
    queryFn: brandsService.getBrandsSelect,
    enabled: open,
  })

  const createMutation = useMutation({
    mutationFn: (data: IProductCreateDTO) => productsService.createProduct(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success(response.message || "Product created successfully.")
      form.reset(defaultValues)
      setOpen(false)
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const categories = (categoriesData?.data ?? []) as ICategoryOption[]
  const brands = (brandsData?.data ?? []) as IBrandOption[]
  const isOptionsLoading = isCategoriesLoading || isBrandsLoading

  const onSubmit = (values: ProductFormValues) => {
    const payload: IProductCreateDTO = {
      ...values,
      price: Number(values.price),
      discount: Number(values.discount),
      model_year: Number(values.model_year),
      stock: Number(values.stock),
      description: values.description || undefined,
      thumbnail: values.thumbnail || undefined,
    }
    createMutation.mutate(payload)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) form.reset(defaultValues)
      }}
    >
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 size-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Create a product for your catalog.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="product_name" render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl><Input placeholder="Enter product name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isOptionsLoading}>
                    <FormControl><SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                    <SelectContent>{categories.map((category) => <SelectItem key={category._id} value={category._id}>{category.category_name}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="brand" render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isOptionsLoading}>
                    <FormControl><SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Select brand" /></SelectTrigger></FormControl>
                    <SelectContent>{brands.map((brand) => <SelectItem key={brand._id} value={brand._id}>{brand.brand_name}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="discount" render={({ field }) => (
                <FormItem><FormLabel>Discount</FormLabel><FormControl><Input type="number" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="stock" render={({ field }) => (
                <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" min="0" step="1" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="model_year" render={({ field }) => (
              <FormItem><FormLabel>Model Year</FormLabel><FormControl><Input type="number" min="1900" step="1" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="thumbnail" render={({ field }) => (
              <FormItem><FormLabel>Thumbnail URL</FormLabel><FormControl><Input type="url" placeholder="https://example.com/product.jpg" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-24" placeholder="Describe the product" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <DialogFooter>
              <Button type="submit" className="cursor-pointer" disabled={createMutation.isPending || isOptionsLoading}>
                {createMutation.isPending ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
