"use client"

import type { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import {
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

export type SelectOption = {
  _id: string
  name: string
}

export const productSchema = z.object({
  product_name: z.string().trim().min(1, "Tên sản phẩm là bắt buộc").max(255, "Tối đa 255 ký tự"),
  description: z.string().trim().min(1, "Mô tả là bắt buộc").max(500, "Tối đa 500 ký tự"),
  price: z.number("Giá phải là số").min(0, "Giá không được âm"),
  discount: z.number("Giảm giá phải là số").min(0, "Tối thiểu 0%").max(70, "Tối đa 70%"),
  stock: z.number("Tồn kho phải là số").int("Tồn kho phải là số nguyên").min(0, "Tồn kho không được âm"),
  model_year: z
    .number("Năm sản xuất phải là số")
    .int("Năm sản xuất phải là số nguyên")
    .min(1900, "Tối thiểu 1900")
    .max(new Date().getFullYear() + 1, "Năm không hợp lệ"),
  thumbnail: z.union([z.literal(""), z.url("URL ảnh không hợp lệ")]),
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  brand: z.string().min(1, "Vui lòng chọn thương hiệu"),
})

export type ProductFormValues = z.infer<typeof productSchema>

export const productDefaultValues = {
  product_name: "",
  description: "",
  price: 0,
  discount: 0,
  stock: 0,
  model_year: new Date().getFullYear(),
  thumbnail: "",
  category: "",
  brand: "",
} satisfies ProductFormValues

// "Hello World" -> "hello-world" (bỏ dấu tiếng Việt), thêm hậu tố để tránh trùng slug
export const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

type ProductFormFieldsProps = {
  form: UseFormReturn<ProductFormValues>
  categoryOptions: SelectOption[]
  brandOptions: SelectOption[]
}

export function ProductFormFields({ form, categoryOptions, brandOptions }: ProductFormFieldsProps) {
  // Input số: chuỗi rỗng -> NaN để zod báo lỗi thay vì ép về 0 âm thầm
  const numberChange = (onChange: (value: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value === "" ? NaN : Number(event.target.value))

  return (
    <>
    <FormField
      control={form.control}
      name="product_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tên sản phẩm</FormLabel>
          <FormControl>
            <Input placeholder="iPhone 15 Pro" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mô tả</FormLabel>
          <FormControl>
            <Textarea rows={3} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Danh mục</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option._id} value={option._id}>{option.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thương hiệu</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {brandOptions.map((option) => (
                  <SelectItem key={option._id} value={option._id}>{option.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Giá ($)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" min={0} {...field} onChange={numberChange(field.onChange)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Giảm giá (%)</FormLabel>
            <FormControl>
              <Input type="number" min={0} max={70} {...field} onChange={numberChange(field.onChange)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tồn kho</FormLabel>
            <FormControl>
              <Input type="number" min={0} {...field} onChange={numberChange(field.onChange)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="model_year"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Năm sản xuất</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={numberChange(field.onChange)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={form.control}
      name="thumbnail"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ảnh đại diện (URL)</FormLabel>
          <FormControl>
            <Input placeholder="https://..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    </>
  )
}
