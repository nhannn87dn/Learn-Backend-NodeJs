'use client'

import Pagination from "./Pagination"
import { useRouter } from 'next/navigation'
const ProductPagination = ({ totalPage, totalRecords }: {
    totalPage: number; totalRecords: number
}) => {
    const router = useRouter()
  return (
    <div>
        <Pagination 
        totalPage={totalPage} totalRecords={totalRecords}
        onPageChange={(page)=>{
            router.push(`/products?page=${page}`)
        }}
         />
    </div>
  )
}

export default ProductPagination