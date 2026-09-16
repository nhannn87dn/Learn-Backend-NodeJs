import Link from "next/link"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="flex min-h-screen container mx-auto">
    <aside className="w-64 bg-gray-100 p-4">
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
    </aside>
    <main className="flex-1 p-4">
        {children}
    </main>
    </section>
}