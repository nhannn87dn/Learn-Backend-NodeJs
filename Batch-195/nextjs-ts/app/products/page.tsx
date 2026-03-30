import Link from "next/link";

const ProductsPage = async(
  {
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) => {
  const page = Number((await searchParams).page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const keywords = (await searchParams).keywords || "";
  //Gọi API lấy danh sách sản phẩm theo page và keywords
  const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}&q=${keywords}`);
  const products = await res.json();
  console.log('<<=== 🚀 products ===>>', products);

  //render UI product grid tailwindcss
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products Page - Page {page}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <Link href={`/products/${product.id}`} key={product.id} className="border rounded p-4">
            <img width={200} height={200} src={product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
      {/* pagination ui with Links */}
      <div className="flex justify-center mt-4">
        <nav className="flex space-x-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Link
              key={i + 1}
              href={`?page=${i + 1}`}
              className={`px-3 py-2 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}

export default ProductsPage