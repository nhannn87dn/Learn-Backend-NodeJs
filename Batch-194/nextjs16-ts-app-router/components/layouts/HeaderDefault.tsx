import Link from "next/link"
import SearchHeader from "../blocks/SearchHeader"

const HeaderDefault = () => {
  return (
    <header className="bg-indigo-500 text-white py-3">
        <div className="container mx-auto">
            <div className="middle-header flex justify-between items-center">
                <div className="logo">
                    <span className="bold text-2xl d-block">Logo</span>
                </div>
               <SearchHeader />
                <nav>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link href="/customer">Customer</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default HeaderDefault