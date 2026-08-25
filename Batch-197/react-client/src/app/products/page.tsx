import { useParams } from "react-router";

const ProductsPage = () => {
     const { slug} = useParams<{slug: string}>();
     //TODO: Get product by slug from API and display it here
  return (
    <div>Products Page: {slug}</div>
  )
}

export default ProductsPage