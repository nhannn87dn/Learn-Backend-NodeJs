
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutAdmin from './component/layouts/LayoutAdmin'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import NoPage from './pages/NoPage'

function App() {


  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutAdmin />}>
              <Route index element={<DashboardPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
