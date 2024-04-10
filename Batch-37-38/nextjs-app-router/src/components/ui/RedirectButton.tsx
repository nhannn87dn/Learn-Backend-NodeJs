'use client'
//==> Client Component

import { useRouter } from 'next/navigation';


const RedirectButton = ({label}: {label: string}) => {
  const router = useRouter()
  return (
    <>
      <button onClick={()=>{
      router.push('/')
    }} className="btn btn-primary">{label}</button>
    </>
  )
}

export default RedirectButton