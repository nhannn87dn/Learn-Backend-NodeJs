import ProductsGrid from "@/components/blocks/ProductsGrid"
import { useQuery } from "@tanstack/react-query"
import { getProductsHomeByCategoryId } from "../home.service"

const LaptopProductsHome = ({limit = 5}: {limit?: number}) => {
    const queryHomeProducts = useQuery({
        queryKey: ['home-products-laptop', limit],
        queryFn: ()=>getProductsHomeByCategoryId({
            id: '68fb79ceca81b40b9e816436', // laptop category id
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

export default LaptopProductsHome