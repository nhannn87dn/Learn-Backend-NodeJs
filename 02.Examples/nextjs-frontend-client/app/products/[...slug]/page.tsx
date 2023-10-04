
type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface ProductType {
  id: string;
  name: string;
  price: string;
  desc: string;
  createdAt: string;
  meterial: string;
  catId: string;
  slug: string;
}



export async function generateMetadata(
  { params, searchParams }: PageProps
){

  // fetch data
  const product = await fetch(
    `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${params.slug[1]}`, {
      next: { revalidate: 5, tags: ['product-detail', params.slug[1]] },
    }
  ).then((res) => res.json());

  return {
    title: product.name,
  };
}

export default async function Page({ params, searchParams }: PageProps) {

  console.log('Products Page',params.slug, params.slug[1])



  const product = await fetch(
    `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${params.slug[1]}`, {
      next: { revalidate: 5, tags: ['product-detail', params.slug[1]] },
    }
  ).then((res) => res.json());

  return <div>My product: {product.name} - {product.price}</div>;
}

export async function generateStaticParams() {
  const products: ProductType[] = await fetch(
    "https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products",
    {
      next: {revalidate: 5, tags: ['products-all'] },
    }
  ).then((res) => res.json());



  //Cắt ra chỉ build 10 link bài viết
  const newProducts = products.slice(0, 10);

  return newProducts.map((product) => {
    const slug = `${product.slug}/${product.id}`;
    return (
      {
        id: slug.toString(),
      }
    )
  });
}
