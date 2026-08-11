"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Pencil } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import type { ICategory } from "@/app/categories/type"

const categoryFormSchema = z.object({
  category_name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

interface CategoryFormDialogProps {
  category?: ICategory | null
  onSubmit: (values: CategoryFormValues) => Promise<void> | void
  submitLabel?: string
}

export function CategoryFormDialog({ category, onSubmit, submitLabel }: CategoryFormDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category_name: "",
      description: "",
      slug: "",
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        category_name: category.category_name,
        description: category.description,
        slug: category.slug,
      })
    } else {
      form.reset({
        category_name: "",
        description: "",
        slug: "",
      })
    }
  }, [category, form])

  async function handleSubmit(values: CategoryFormValues) {
    await onSubmit(values)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {category ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
            <Pencil className="size-4" />
            <span className="sr-only">Edit category</span>
          </Button>
        ) : (
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogDescription>
            {category ? "Update category details below." : "Create a new category for your catalog."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter slug" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter category description" className="min-h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                {submitLabel ?? (category ? "Save Changes" : "Create Category")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
