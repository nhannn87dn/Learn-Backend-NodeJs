'use client'

import { useRouter } from "next/navigation"


const PageProfile = () => {
   const router = useRouter()
  return (
    <div>
      <h1>PageProfile</h1>
       <button onClick={()=>{
         router.push('/')
       }}>Go Home</button>
    </div>
  )
}

export default PageProfile