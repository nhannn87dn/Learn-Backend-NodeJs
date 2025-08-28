import { Brand, BrandsResponse } from "@/types/brand.type";
import BrandList from "./BrandList"
import { Suspense } from "react";

const fetchBrands = async (): Promise<Brand[]> => {
  const response = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/brands`);
  const brandsResponse: BrandsResponse = await response.json();
  return brandsResponse.data.data;
}

const BrandPage = () => {
    //Nhớ là ko có async/await ở đây
  const brands = fetchBrands();

  return (
    <div>
        <h1>Pass Data from Server to client component</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <BrandList brands={brands} />
        </Suspense>
    </div>
  )
}

export default BrandPage