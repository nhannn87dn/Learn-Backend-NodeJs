'use client'
import React from 'react';
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
const CustomerLayout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const {data:session, status } = useSession();
  const user = session?.user;
  //Kiểm tra xem đã đăng nhập chưa, nếu chưa thì cho login
  React.useEffect(()=>{
    if (status  !== 'authenticated') {
      router.push('/login');
  }
  },[status,router])

  return (
    <div className="customer-layout flex gap-x-5">
    <aside className="sidebar w-[200px]">
        <nav>
          <ul className='flex flex-col gap-y-3'>
            <li className='flex mb-5'>
                <div className="avatar">
                  <img height={40} width={40} src={user?.image} alt="" />
                </div>
                <div className="username">
                  {user?.name}
                </div>
            </li>
            <li><Link href={'/customers'}>Dashboard</Link></li>
            <li><Link href={'/customers/profile'}>Profile</Link></li>
            <li><Link href={'/customers/orders'}>Orders</Link></li>
            <li><Link href={'/customers/messages'}>Messages</Link></li>
            <li>
              <button type='button' onClick={()=>signOut()}>Đăng xuất</button>
            </li>
          </ul>
        </nav>
    </aside>
    <section className="content-wrapper border rounded p-5 flex-1">
        {children}
    </section>
</div>
  )
}

export default CustomerLayout