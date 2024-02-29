
import Link from 'next/link'

type DefaultLayoutType = {
  children: React.ReactNode
}
export default function DefaultLayout({children }: DefaultLayoutType){
  return (
    <>
      <header className='bg-indigo-500 text-white'>
      <nav className="container mx-auto py-4">
        <ul className='flex gap-x-5'>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Product</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
      </header>
      <main className="container my-5 mx-auto">
        {children}
      </main>
      <footer className="container mx-auto" >Footer</footer>
    </>
  )
}