"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { ENV } from "@/config/env"
import { useAuthStore } from "@/stores/use-auth-store"
import {
  ProductFormFields,
  productDefaultValues,
  productSchema,
  type ProductFormValues,
  type SelectOption,
} from "./product-form"

export type EditableProduct = {
  _id: string
  product_name: string
  description?: string
  price: number
  discount?: number
  stock: number
  model_year?: number
  thumbnail?: string
  category?: { _id: string } | null
  brand?: { _id: string } | null
}

type ProductEditDialogProps = {
  product: EditableProduct | null
  onOpenChange: (open: boolean) => void
  categoryOptions: SelectOption[]
  brandOptions: SelectOption[]
  onUpdated: () => void
}

const toFormValues = (product: EditableProduct): ProductFormValues => ({
  product_name: product.product_name,
  description: product.description ?? "",
  price: product.price,
  discount: product.discount ?? 0,
  stock: product.stock,
  model_year: product.model_year ?? productDefaultValues.model_year,
  thumbnail: product.thumbnail ?? "",
  category: product.category?._id ?? "",
  brand: product.brand?._id ?? "",
})

export function ProductEditDialog({
  product,
  onOpenChange,
  categoryOptions,
  brandOptions,
  onUpdated,
}: ProductEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
  })

  // Nạp dữ liệu của sản phẩm đang sửa mỗi khi mở dialog
  useEffect(() => {
    if (product) form.reset(toFormValues(product))
  }, [product, form])

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSubmitting) return
    onOpenChange(nextOpen)
  }

  const onSubmit = async (values: ProductFormValues) => {
    if (!product) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`${ENV.API_URL}/v1/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...values, thumbnail: values.thumbnail || undefined }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message ?? "Unable to update product")
      }

      toast.success("Product updated successfully")
      onOpenChange(false)
      onUpdated()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update product")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={!!product} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sửa sản phẩm</DialogTitle>
          <DialogDescription>Cập nhật thông tin sản phẩm.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProductFormFields form={form} categoryOptions={categoryOptions} brandOptions={brandOptions} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang lưu..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
