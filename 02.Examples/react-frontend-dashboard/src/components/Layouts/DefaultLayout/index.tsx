import Header from '../Header'
import Footer from '../Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../../Navigation'
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom";


const DefaultLayout = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  

  React.useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated]);

  

  return (
    <div className='layout_dashboard flex flex-col justify-between h-screen'>
     <Header  />
     <div className='flex-1'>

      <main className="grid grid-cols-12 h-full">
          <div className="col-span-2 bg-slate-900">
              <Navigation />
            </div>
            <div className="col-span-10">
              <div className='p-3 overflow-y-auto'>
                <Outlet />
              </div>
            </div>
      </main>
     </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout