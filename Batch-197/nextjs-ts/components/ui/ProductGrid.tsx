import Image from "next/image";

type Product = {
    _id: number;
    product_name: string;
    price: number
    thumbnail: string;
}
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-4">
      {/* Lưới sản phẩm cố định 5 cột */}
      <div className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Ảnh sản phẩm */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <Image
                src={product.thumbnail}
                alt={product.product_name}
                width={200}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                  {product.product_name}
                </h3>
                
              </div>

              {/* Giá & Nút bấm */}
              <div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-sm font-bold text-red-600">
                    {product.price}
                  </span>
                </div>

                <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-medium rounded-lg transition-colors">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}