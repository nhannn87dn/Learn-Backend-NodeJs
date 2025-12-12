import Link from "next/link"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container mx-auto my-5">
        <div className="customer-layout flex gap-x-5">
            <aside className="navigation  bg-gray-100 p-4 w-1/4">
                <nav>
                    <ul>
                        <li><Link href="/customer">Dashboard</Link></li>
                        <li><Link href="/customer/profile">Profile</Link></li>
                        <li><Link href="/customer/orders">Orders</Link></li>
                        <li><Link href="/customer/settings">Đăng xuất</Link></li>
                    </ul>
                </nav>
            </aside>
            <section className="main-content bg-white p-4 w-3/4">
                {children}
            </section>
        </div>
    </main>
  )
}