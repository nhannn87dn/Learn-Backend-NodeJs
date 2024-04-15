import Footer from "./Footer"
import Header from "./Header"

 
export default function DefaultLayout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main className="container mx-auto my-5">{children}</main>
      <Footer />
    </>
  )
}