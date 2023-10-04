// import type { Metadata, ResolvingMetadata } from "next";
export const revalidate = 5; // revalidate at most 5 seconds
// import EditProduct from "@/components/ui/EditProduct";
import EditProductMutation from "@/components/ui/EditProductMutation";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface ProductType {
  id: string;
  name: string;
  price: string;
  desc: string;
  createdAt: string;
  material: string;
  catId: string;
  slug: string;
}


async function fetchProductByID(id: string){
  const product = await fetch(
    `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${id}`, {
      next: { tags: ['product-edit', id] },
    }
  ).then((res) => res.json());
    return product;
}


export async function generateMetadata(
  { params, searchParams }: PageProps
){

  // fetch data
  const product = await fetchProductByID(params.id)

  return {
    title: `Edit Product | ${product.name}`,
  };
}


export default async function Page({ params, searchParams }: PageProps) {

 const product =  await fetchProductByID(params.id);
 
  return (
    <>
    {/* 
      Edit Product là một tính năng có sử dụng state, có fetch API
      Do vậy bạn không thể để chúng trong page.tsx này vì nó là server components
      Cách giải quyết là bạn tách nó ra thành một client component rồi nhúng vào trong một server component
    */}
      {/* <EditProduct product={product} /> */}
      <EditProductMutation product={product}/>
    </>
  )
}

export async function generateStaticParams() {
  const products: ProductType[] = await fetch(
    "https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products",
    { next: {tags: ['products-all'] }}
  ).then((res) => res.json());

  //Cắt ra chỉ build 10 link bài viết
  const newProducts = products.slice(0, 10);

  return newProducts.map((product) => ({
    id: product.id.toString(),
  }));
}
