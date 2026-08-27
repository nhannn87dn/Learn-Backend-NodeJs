"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // Hoặc toast từ shadcn/ui

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosClient from "@/lib/axiosClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  avatar: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Vui lòng chọn một file ảnh.")
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

export function AvatarUploadForm() {
  const [progress, setProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // 1. Định nghĩa React Query Mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);

      // Dùng Axios để theo dõi tiến trình upload
      const response = await axiosClient.post("/v1/uploads/profile", formData, {
        headers: { 
            "Content-Type": "multipart/form-data" // bắt buộc để upload file
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
      toast.success("Tải ảnh đại diện thành công!");
      // Đồng bộ lại dữ liệu user trên toàn app
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      // Reset form
      form.reset();
      setProgress(0);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Tải ảnh thất bại!";
      toast.error(message);
      setProgress(0);
    },
  });

  // 2. Hàm xử lý chọn file & Preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (files: FileList | null) => void
  ) => {
    const files = e.target.files;
    fieldOnChange(files);

    if (files && files[0]) {
      const file = files[0];
      // Kiểm tra sơ bộ để tạo URL preview
      if (ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  // 3. Hàm Submit Form
  function onSubmit(values: FormValues) {
    const file = values.avatar[0];
    setProgress(0);
    uploadAvatarMutation.mutate(file);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 border rounded-xl shadow-sm bg-card"
      >
        {/* Ảnh xem trước (Preview Avatar) */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-24 h-24 border">
            <AvatarImage src={previewUrl || undefined} alt="Avatar preview" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Ảnh xem trước</span>
        </div>

        {/* Input Chọn File */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Chọn ảnh đại diện mới</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  disabled={uploadAvatarMutation.isPending}
                  onChange={(e) => handleFileChange(e, onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thanh Tiến Trình (Progress Bar) */}
        {uploadAvatarMutation.isPending && (
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
          disabled={uploadAvatarMutation.isPending}
        >
          {uploadAvatarMutation.isPending ? "Đang xử lý..." : "Lưu ảnh đại diện"}
        </Button>
      </form>
    </Form>
  );
}