import Link from "next/link"

const CustomerLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="customer-layout flex">
       <div className="slidebar w-1/4">
                <ul>
                    <li>
                        <Link href="/customer">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/customer/profile">Profile</Link>
                    </li>
                    <li>
                        <Link href="/customer/orders">Orders</Link>
                    </li>
                </ul>
       </div>
       <div className="main-content w-3/4 p-4">
         {children}
       </div>
    </div>
  )
}

export default CustomerLayout