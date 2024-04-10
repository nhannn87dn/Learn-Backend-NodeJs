import Link from 'next/link'

const CustomerLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="customer-layout flex gap-x-5">
    <aside className="sidebar w-[200px]">
        <nav>
          <ul>
            <li><Link href={'/customers'}>Dashboard</Link></li>
            <li><Link href={'/customers/profile'}>Profile</Link></li>
            <li><Link href={'/customers/orders'}>Orders</Link></li>
            <li><Link href={'/customers/messages'}>Messages</Link></li>
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