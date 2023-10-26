import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import Category from './pages/Category';
import Products from './pages/Products';
import Login from './pages/Login';
import DefaultLayout from './components/Layouts/DefaultLayout';
import EmptyLayout from './components/Layouts/EmptyLayout';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* dashboard */}
        <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Category />} />
            <Route path="suppliers" element={<Category />} />
            <Route path="products" element={<Products />} />
            <Route path="employees" element={<Category />} />
            <Route path="customers" element={<Category />} />
            <Route path="orders" element={<Category />} />
        </Route>
        {/* Login page */}
        <Route path='/login' element={<EmptyLayout />}>
          <Route index element={<Login />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
