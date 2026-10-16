"use client"

import { useState } from "react"
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
import {
  ProductFormFields,
  productDefaultValues,
  productSchema,
  toSlug,
  type ProductFormValues,
  type SelectOption,
} from "./product-form"

type ProductCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoryOptions: SelectOption[]
  brandOptions: SelectOption[]
  onCreated: () => void
}

export function ProductCreateDialog({
  open,
  onOpenChange,
  categoryOptions,
  brandOptions,
  onCreated,
}: ProductCreateDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
  })

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSubmitting) return
    if (!nextOpen) form.reset(productDefaultValues)
    onOpenChange(nextOpen)
  }

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...values,
        slug: `${toSlug(values.product_name)}-${Date.now().toString(36)}`,
        thumbnail: values.thumbnail || undefined,
      }

      const response = await fetch(`${ENV.API_URL}/v1/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message ?? "Unable to create product")
      }

      toast.success("Product created successfully")
      form.reset(productDefaultValues)
      onOpenChange(false)
      onCreated()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogDescription>Nhập thông tin sản phẩm mới.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProductFormFields form={form} categoryOptions={categoryOptions} brandOptions={brandOptions} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
