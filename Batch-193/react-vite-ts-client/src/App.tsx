import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import DefaultLayout from "./layouts/DefaultLayout";
import CartPage from "./pages/CartPage";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import CartCheckoutPage from "./pages/CartCheckoutPage";
import CartDonePage from "./pages/CartDonePage";

const queryClient = new QueryClient()

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:slug" element={<ProductsPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="cart/checkout" element={<CartCheckoutPage />} />
            <Route path="cart/done" element={<CartDonePage />} />
          </Route>
          
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

}

export default App
