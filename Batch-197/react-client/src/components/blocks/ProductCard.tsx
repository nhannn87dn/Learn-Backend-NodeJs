import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import type { IProduct } from "@/types/products";

const ProductCard = ({ product }: {product: IProduct}) => {
  // Hàm format tiền tệ VNĐ
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      {/* Phần Ảnh: Tỷ lệ 1:1, hiệu ứng zoom nhẹ khi hover */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.thumbnail}
          alt={product.product_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
      </div>

      {/* Phần Thông tin */}
      <div className="flex flex-1 flex-col p-4">
        {/* Tên sản phẩm: truncate để không bị rớt dòng làm hỏng layout grid */}
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight text-foreground transition-colors hover:text-primary cursor-pointer">
          {product.product_name}
        </h3>


        {/* Giá */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-bold text-destructive">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Nút Thêm vào giỏ (Đẩy xuống đáy nhờ flex-1 ở container) */}
        <div className="mt-auto pt-4">
          <Button variant="outline" className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;