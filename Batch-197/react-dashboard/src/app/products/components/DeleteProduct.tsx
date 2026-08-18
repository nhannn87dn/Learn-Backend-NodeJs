"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
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
import { productsService } from "../products.service"
import type { IProduct } from "../type"

interface DeleteProductProps {
  product: IProduct
}

export function DeleteProduct({ product }: DeleteProductProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: () => productsService.deleteById(product._id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success(response.message || "Product deleted successfully.")
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to delete product. Please try again.")
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" aria-label={`Delete ${product.product_name}`}>
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete product?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{product.product_name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setOpen(false)} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" className="cursor-pointer" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? "Deleting..." : "Delete Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
