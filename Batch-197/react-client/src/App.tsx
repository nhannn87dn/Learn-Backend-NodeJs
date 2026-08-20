import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from './components/layouts/DefaultLayout'
import HomePage from './app/page'
import './App.css'

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Các route con sẽ được render trong <Outlet /> của DefaultLayout */}
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
