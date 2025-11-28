import ProductsGrid from "@/components/blocks/ProductsGrid"
import { useQuery } from "@tanstack/react-query"
import { getProductsHomeByCategoryId } from "../home.service"

const MobileProductsHome = ({limit = 5}: {limit?: number}) => {
    const queryHomeProducts = useQuery({
        queryKey: ['home-products-mobile', limit],
        queryFn: ()=>getProductsHomeByCategoryId({
            id: '68fb7ab3dbbe0847aa5ecae4', // mobile category id
            limit
        })
    })

    console.log('<<=== 🚀 queryHomeProducts.data ===>>',queryHomeProducts.data);
  return (
   <>
   <ProductsGrid products={queryHomeProducts.data?.data || []} />
   </>
  )
}

export default MobileProductsHome