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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB mỗi file
const MAX_FILES = 3; // Tối đa 3 file
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  photos: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Vui lòng chọn ít nhất một hình ảnh.")
    .refine((files) => files && files.length <= MAX_FILES, `Chỉ được chọn tối đa ${MAX_FILES} hình ảnh.`)
    .refine(
      (files) => files && Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      "Mỗi hình ảnh có kích thước tối đa là 5MB."
    )
    .refine(
      (files) => files && Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Chỉ chấp nhận các định dạng .jpg, .jpeg, .png và .webp."
    ),
});

type FormValues = z.infer<typeof formSchema>;

export function PhotosUploadForm() {
  const [progress, setProgress] = useState<number>(0);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // 1. Định nghĩa React Query Mutation
  const uploadPhotosMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      
      // Lặp qua danh sách file và append chung tên field 'photos'
      Array.from(files).forEach((file) => {
        formData.append("photos", file);
      });

      const response = await axiosClient.post("/v1/uploads/photos", formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
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
      toast.success("Tải danh sách ảnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["user-photos"] });
      
      // Reset form & state xem trước
      form.reset();
      setPreviewUrls([]);
      setProgress(0);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Tải ảnh thất bại!";
      toast.error(message);
      setProgress(0);
    },
  });

  // 2. Hàm xử lý chọn file & tạo danh sách Preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (files: FileList | null) => void
  ) => {
    const files = e.target.files;
    fieldOnChange(files);

    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    } else {
      setPreviewUrls([]);
    }
  };

  // 3. Hàm Submit Form
  function onSubmit(values: FormValues) {
    setProgress(0);
    uploadPhotosMutation.mutate(values.photos);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 border rounded-xl shadow-sm bg-card"
      >
        {/* Lưới hình ảnh xem trước (Preview Images Grid) */}
        {previewUrls.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Ảnh xem trước ({previewUrls.length}/{MAX_FILES}):</span>
            <div className="grid grid-cols-3 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square border rounded-md overflow-hidden bg-muted">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Chọn File */}
        <FormField
          control={form.control}
          name="photos"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Chọn danh sách ảnh (tối đa {MAX_FILES} ảnh)</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  multiple // Kích hoạt thuộc tính chọn nhiều file
                  accept="image/*"
                  disabled={uploadPhotosMutation.isPending}
                  onChange={(e) => handleFileChange(e, onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thanh Tiến Trình (Progress Bar) */}
        {uploadPhotosMutation.isPending && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Đang tải lên...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Nút Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={uploadPhotosMutation.isPending}
        >
          {uploadPhotosMutation.isPending ? "Đang xử lý..." : "Lưu danh sách ảnh"}
        </Button>
      </form>
    </Form>
  );
}