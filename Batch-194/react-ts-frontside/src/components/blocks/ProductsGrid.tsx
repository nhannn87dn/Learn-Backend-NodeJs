import type { IProduct } from "@/modules/home/home.service";
import { Link } from "react-router";

const ProductsGrid = ({ products }: { products: IProduct[] }) => {
  console.log("<<=== 🚀 products ===>>", products);
  return (
    <div className="products-list grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {products?.map((product) => (
        <Link to={`/products/${product.slug}`} className="product-item" key={product._id}>
          <div className="product-thumb overflow-hidden mb-2">
            <img
              className="w-full h-auto "
              src={product.thumbnail}
              alt={product.product_name}
            />
          </div>
          <div className="product-info">
            <h3 className="product-title text-lg font-semibold">
              {product.product_name}
            </h3>
            <p className="product-price text-indigo-600 font-bold">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsGrid;
