"use client"

import { useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BaseLayout } from "@/components/layouts/base-layout"
import { categoriesService } from "./categories.service"
import type { ICategory } from "./type"
import { StatCards } from "./components/stat-cards"
import { CategoryTable } from "./components/data-table"

const CategoriesPage = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getCategories,
  })

  const categories = useMemo(() => {
    const payload = data?.data
    const records = payload?.records

    if (Array.isArray(records)) {
      return records
    }

    if (Array.isArray(payload)) {
      return payload
    }

    return []
  }, [data])

  const createMutation = useMutation({
    mutationFn: ({ data }: { data: Partial<ICategory> }) => categoriesService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ICategory> }) => categoriesService.updateById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoriesService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const handleAddCategory = async (values: { category_name: string; description: string; slug: string }) => {
    await createMutation.mutateAsync({ data: values })
  }

  const handleEditCategory = async (category: ICategory) => {
    await updateMutation.mutateAsync({ id: category._id, data: category })
  }

  const handleDeleteCategory = async (id: string) => {
    await deleteMutation.mutateAsync(id)
  }

  return (
    <BaseLayout title="Categories" description="Manage your categories and content groups">
      <div className="flex flex-col gap-4">
        <div className="@container/main px-4 lg:px-6">
          <StatCards total={categories.length} />
        </div>

        <div className="@container/main px-4 lg:px-6 mt-8 lg:mt-12">
          {isLoading ? (
            <div className="rounded-md border p-6 text-sm text-muted-foreground">Loading categories...</div>
          ) : isError ? (
            <div className="rounded-md border p-6 text-sm text-red-500">
              {(error as Error)?.message || "Failed to load categories"}
            </div>
          ) : (
            <CategoryTable
              categories={categories}
              onDelete={handleDeleteCategory}
              onEdit={handleEditCategory}
              onAdd={handleAddCategory}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  )
}

export default CategoriesPage