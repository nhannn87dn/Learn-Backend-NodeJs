"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axiosClient from "@/lib/axiosClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  product_name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự."),
  price: z
    .number({ message: "Vui lòng nhập giá trị số hợp lệ." })
    .min(1000, "Giá sản phẩm tối thiểu là 1,000 VNĐ."),
  thumbnail: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Vui lòng chọn ảnh thumbnail.")
    .refine(
      (files) => files && files[0]?.size <= MAX_FILE_SIZE,
      "Kích thước file tối đa là 5MB."
    )
    .refine(
      (files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Chỉ chấp nhận các định dạng .jpg, .jpeg, .png và .webp."
    ),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateProductForm() {
  const [progress, setProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      price: 0,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData();
      //chuẩn bị payload để gửi lên backend
      formData.append("product_name", values.product_name);
      formData.append("price", values.price.toString());
      formData.append("thumbnail", values.thumbnail[0]);

      const response = await axiosClient.post("/v1/uploads/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("Tạo sản phẩm thành công!");
      queryClient.invalidateQueries({ queryKey: ["products"] });

      form.reset();
      setPreviewUrl(null);
      setProgress(0);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Tạo sản phẩm thất bại!";
      toast.error(message);
      setProgress(0);
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (files: FileList | null) => void
  ) => {
    const files = e.target.files;
    fieldOnChange(files);

    if (files && files[0]) {
      const file = files[0];
      if (ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  function onSubmit(values: FormValues) {
    setProgress(0);
    createProductMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 border rounded-xl shadow-sm bg-card"
      >
        <h2 className="text-lg font-semibold">Tạo sản phẩm mới</h2>

        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên sản phẩm..."
                  disabled={createProductMutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Giá sản phẩm (VNĐ)</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="number"
                  placeholder="100000"
                  disabled={createProductMutation.isPending}
                  onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {previewUrl && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Xem trước Thumbnail:</span>
            <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-muted">
              <img
                src={previewUrl}
                alt="Thumbnail preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Ảnh Thumbnail</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  disabled={createProductMutation.isPending}
                  onChange={(e) => handleFileChange(e, onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {createProductMutation.isPending && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Đang tải lên...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={createProductMutation.isPending}
        >
          {createProductMutation.isPending ? "Đang xử lý..." : "Tạo sản phẩm"}
        </Button>
      </form>
    </Form>
  );
}