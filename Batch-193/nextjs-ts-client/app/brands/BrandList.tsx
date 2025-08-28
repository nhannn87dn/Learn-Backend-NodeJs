'use client'

import { Brand } from "@/types/brand.type"
import { use } from "react";

const BrandList =  ({ brands }: {brands: Promise<Brand[]>}) => {
    console.log('<<=== 🚀 brands ===>>',brands);
    const brandData = use(brands);
  return (
    <div>
      {brandData.map(brand => (
        <div key={brand.id}>
          <h2>{brand.brand_name}</h2>
          <p>{brand.description}</p>
        </div>
      ))}
    </div>
  )
}

export default BrandList