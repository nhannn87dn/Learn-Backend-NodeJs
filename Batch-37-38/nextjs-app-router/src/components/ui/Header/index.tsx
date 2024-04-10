import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-indigo-500 text-white">
        <div className="container mx-auto">
            <div className="header-middle flex items-center justify-between py-5">
                <div className="logo">
                    <strong className="text-4xl">LOGO</strong>
                </div>
                <nav>
                    <ul className="flex gap-x-5">
                        <li>
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link href={'/products'}>Products</Link>
                        </li>
                        <li><Link href={'/customers'}>Customers</Link></li>
                        <li>
                        <Link href={'/login'}>Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header