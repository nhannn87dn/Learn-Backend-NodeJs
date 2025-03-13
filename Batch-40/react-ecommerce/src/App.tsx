import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import NoPage from './pages/NoPage';
import HomePage from './pages/HomePage';
import ProductByCategoryPage from './pages/ProductByCategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import DefaultLayout from './layouts/DefaultLayout';
import CartPage from './pages/CartPage';


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
      <Routes>
        {/* Default Layout */}
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="categories/:slug" element={<ProductByCategoryPage />} />
          <Route path="products/:slug" element={<ProductDetailsPage />} />
          <Route path='cart' element={<CartPage />} />
        </Route>
        {/* Other routes */}
        {/*... */}
        <Route path='*' element={<NoPage />} />
      </Routes>
     </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
