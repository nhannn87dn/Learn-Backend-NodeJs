import Footer from "../blocks/Footer"
import Header from "../blocks/Header"
import { Outlet } from "react-router"

const DefaultLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default DefaultLayout