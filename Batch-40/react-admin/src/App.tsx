import '@ant-design/v5-patch-for-react-19';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from './layouts/DefaultLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NoPage from './pages/NoPage';
import EmptyLayout from './layouts/EmptyLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
         {/* Mac dinh all cac page su dung  DefaultLayout */}
        <Route path='/' element={<DefaultLayout />}>
            <Route index element={<DashboardPage />} />
        </Route>
         {/* Login thi su dung Emptylayout */}
        <Route  path='/login' element={<EmptyLayout />}>
            <Route index element={<LoginPage />} />
        </Route>
        {/* 404 Not Found */}
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
