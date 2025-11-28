import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from './components/layouts/DefaultLayout';
import HomePage from './modules/home/HomePage';
import NotFoundPage from './modules/notfound/NotFoundPage';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ProductPage from './modules/product/ProductPage';
import CategoryPage from './modules/category/CategoryPage';

// Create a client
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/categories/:categorySlug" element={<CategoryPage />} />
        <Route path="/products/:productSlug" element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  )
}

export default App
