export const getProductPagination = async (page: number, limit: number) => {
  const response = await fetch(
    `${process.env.BACKEND_URL_API}/v1/products/products-pagination?page=${page}&limit=${limit}`,
    { 
      cache: 'force-cache', //bật tính năng cache cho fetch
      next: { revalidate: 60 },//tự động làm mới cache sau 60s
    }
  );
  const data = await response.json();
  return data;
};


export const getProductDetailsBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.BACKEND_URL_API}/v1/products/product-details-slug/${slug}`,
    { 
      cache: 'force-cache', //bật tính năng cache cho fetch
      next: { revalidate: 60 },//tự động làm mới cache sau 60s
    }
  )
  const data = await response.json();
  return data;
}