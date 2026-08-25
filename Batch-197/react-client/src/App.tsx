import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from './components/layouts/DefaultLayout'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import HomePage from './app/page'
import './App.css'
import NotFoundPage from './app/not-found'
import CategoryPage from './app/categories/page'
import ProductsPage from './app/products/page'
import ShoppingCartPage from './app/shopping-cart/page'

// Create a client
const queryClient = new QueryClient()

function App() {



  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Các route con sẽ được render trong <Outlet /> của DefaultLayout */}
          <Route index element={<HomePage />} />
          <Route path="categories/:slug" element={<CategoryPage />} />
          <Route path="products/:slug" element={<ProductsPage />} />
          <Route path="shopping-cart" element={<ShoppingCartPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
   </BrowserRouter>
   </QueryClientProvider>
  )
}

export default App
