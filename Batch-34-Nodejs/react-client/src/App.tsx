import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Login from './pages/LoginPage';
import DefaultLayout from './components/Layouts/DefaultLayout';
import EmptyLayout from './components/Layouts/EmptyLayout';
import OnlyHeaderLayout from './components/Layouts/OnlyHeaderLayout';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Customers from './pages/Customers';
import CustomerOrders from './pages/Customers/CustomerOrders';
import CustomerProfile from './pages/Customers/CustomerProfile';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
           {/* DefaultLayout */}
          <Route path='/' element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailsPage />} />
          </Route>
          
          {/* OnlyHeaderLayout */}
          <Route path='/cart' element={<OnlyHeaderLayout />}>
              <Route index element={<CartPage />} />
          </Route>
          <Route path='/checkout' element={<OnlyHeaderLayout />}>
              <Route index element={<CheckoutPage />} />
          </Route>
          {/* Nested Layout */}
          <Route path='/customers' element={<OnlyHeaderLayout />}>
              <Route path='/customers' element={<Customers />}>
                <Route path='orders' element={<CustomerOrders />} />
                <Route path='profile' element={<CustomerProfile />} />
              </Route>
          </Route>

          {/* EmptyLayout */}
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