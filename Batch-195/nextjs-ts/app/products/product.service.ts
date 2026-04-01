import { cacheLife } from "next/cache";

export const getProducts = async ({
  offset = 0,
  limit = 10,
  keywords = "",
}: {
  offset?: number;
  limit?: number;
  keywords?: string;
}) => {
  "use cache";
  cacheLife("hours"); //cache data for 1 hour

  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}&q=${keywords}`,
  );
  const products = await res.json();
  return products;
};
