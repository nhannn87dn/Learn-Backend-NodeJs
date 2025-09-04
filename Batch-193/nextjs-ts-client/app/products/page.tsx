import Link from "next/link";
import { ProductsResponse } from "@/types/product.type";
import { Metadata } from "next";

const fetchProducts = async (page: string): Promise<ProductsResponse> => {
  const response = await fetch(
    `https://learn-backend-nodejs.onrender.com/api/v1/products?page=${page}`, {
      cache:"force-cache", // force-cache, only fetch once and cache it
      //Muon 3s sau phai lam tuoi lai thi ca revalidate
      next: { revalidate: 10, tags: ['products'] } // revalidate every 10 seconds
    }
  );
  return response.json();
};

export const metadata: Metadata = {
  title: 'Product Page',
  description: '...',
}

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const page = (await searchParams).page;

  console.log("<<=== 🚀 page ===>>", page);

  const products = await fetchProducts((page as string) || "1");

  console.log("<<=== 🚀 products ===>>", products);

  return (
    <div>
      <h1>ProductPage</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.data.data.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-lg font-bold mb-2">{product.product_name}</h2>
            <p className="text-gray-700 mb-4">${product.price}</p>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <p>
          Page {products.data.page} of {products.data.totalPages}
        </p>
        <div className="flex space-x-2">
          {Array.from({ length: products.data.totalPages }, (_, i) => (
            <Link
              key={i}
              className={`px-4 py-2 border rounded`}
              href={`/products?page=${i + 1}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
