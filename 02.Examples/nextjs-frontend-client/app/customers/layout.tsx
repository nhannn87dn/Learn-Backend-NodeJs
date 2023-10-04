import Link from "next/link"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-12">
          <div className="col-span-4">
            <ul>
              <li><Link href='/customers'>Dashboard</Link></li>
              <li><Link href='/customers/orders'>Danh sách đơn hàng</Link></li>
              <li><Link href='/customers/profile'>Thông tin cá nhân</Link></li>
            </ul>
          </div>
          <div className="col-span-8">
            {children}
          </div>
      </div>
  )
}
