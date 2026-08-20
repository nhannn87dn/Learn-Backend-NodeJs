import { Outlet } from "react-router"
import Footer from "./Footer"
import { Header } from "./Header"

const DefaultLayout = () => {
  return (
    <>
    <Header />
    <main className="container mx-auto px-4 md:px-8 my-5">
      <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default DefaultLayout