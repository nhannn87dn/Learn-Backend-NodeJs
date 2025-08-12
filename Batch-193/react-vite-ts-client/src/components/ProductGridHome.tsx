import { getProductHome } from "@/services/productService"
import { useQuery } from "@tanstack/react-query"
import ProductsGrid from "./ProductsGrid"

const ProductGridHome = ({
    title,
    linkMore,
    catId,
    limit = 5
}: {title: string, linkMore: string, catId: string, limit?: number}) => {

    const productsHomeQuery = useQuery({
        queryKey: ["products", catId],
        queryFn: () => getProductHome({ catId, limit })
    })

    console.log('<<=== 🚀  productsHomeQuery ===>>',productsHomeQuery.data);

  return (
    <section className="products-grid my-5">
          <div className="section-header flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="section-more">
              <a href={linkMore} className="text-sm text-blue-500">See More</a>
            </div>
          </div>
          <ProductsGrid products={productsHomeQuery.data || []} />
      </section>
  )
}

export default ProductGridHome