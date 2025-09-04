import { ProductResponse, ProductsResponse } from "@/types/product.type";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

//Ap dung chung cho toan cac ham fetch trong file nay
export const revalidate = 10; // In seconds

const fetchProduct = async (id: number): Promise<ProductResponse> => {
  const response = await fetch(
    `https://learn-backend-nodejs.onrender.com/api/v1/products/${id}`,{
      //cache: "no-store", setting default to no-store
      cache: "force-cache", // force-cache, only fetch once and cache it
      next: { revalidate: 10 } // revalidate every 10 seconds
    }
  );
  return response.json();
};

/*
Muc dich cua ham nay
la de Next.js biet duoc
cac id nao can pre-render
tu do Next.js se goi lai fetchProduct
/products/1, /products/2, /products/3...
*/
export async function generateStaticParams() {
  const response = await fetch(
    `https://learn-backend-nodejs.onrender.com/api/v1/products`
  );
  //Chỉ cần trả về 1 mảng khoảng 10-20 phần tử thôi
  //nếu quá nhiều sẽ làm chậm quá trình build
  const productAllResponse: ProductsResponse = await response.json();
  return productAllResponse.data.data.map((p) => ({
    id: String(p.id), //chuyen number to string
  }))
}
type Props = {
  params: Promise<{ id: number }>;
}

//dynamic metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id

  const product = await fetchProduct(id);
 
  return {
    title: product.data.product_name,
    description: product.data.description,
  }
}

const ProductPageDetail = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const id = (await params).id;
  //goij api
  const product = await fetchProduct(id);
  //handle not found
  if (!product.data) {
    notFound();
  }
  return (
    <div>
      <h1>ProductPageDetail {id}</h1>
      <h2 className="font-bold text-xl">{product.data.product_name}</h2>
      <p>
        <strong>Price:</strong> ${product.data.price}
      </p>
    </div>
  );
};

export default ProductPageDetail;
