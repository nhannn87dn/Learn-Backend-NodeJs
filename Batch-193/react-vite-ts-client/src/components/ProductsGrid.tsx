import type { Product } from "@/services/productService"
import { Link } from "react-router"

const ProductsGrid = ({
    products
}: {products: Product[]}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <Link to={`/product/${product.slug}`} key={product._id} className="border rounded">
                    <div className="thumbnail w-full h-[160px] overflow-hidden mb-2">
                        <img className="w-full h-auto" src={product.thumbnail} alt={product.product_name} />
                    </div>
                    <h3 className="font-bold px-3">{product.product_name}</h3>
                    <div className="price  px-3">
                        <strong>${product.price}</strong>
                    </div>
                </Link>
            ))}
    </div>
  )
}

export default ProductsGrid