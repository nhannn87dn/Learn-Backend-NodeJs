import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Toaster } from "@/components/ui/sonner"
const DefaultLayout = () => {
  return (
    <>
     <Header />
     <Outlet />
     <Footer />
      <Toaster position="top-center" />
    </>
  )
}

export default DefaultLayout