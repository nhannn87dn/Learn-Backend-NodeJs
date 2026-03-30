import Link from "next/link";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto">
        <div className="customer-layout flex gap-3">
      <aside className="w-64 bg-gray-100 p-4">
        <ul>
          <li><Link href="/customer">Dashboard</Link></li>
          <li><Link href="/customer/orders">Orders</Link></li>
          <li><Link href="/customer/profile">Profile</Link></li>
          <li><Link href="/customer/settings">Settings</Link></li>
        </ul>
      </aside>
      <div className="main-content flex-1 p-4">{children}</div>
    </div>
    </section>
  );
}
