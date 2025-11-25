import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './App.css'
import DefaultLayout from "./components/layouts/DefaultLayout";
import DashboardPage from "./modules/dashboard/DashboardPage";
import CategoriesPage from "./modules/categories/CategoriesPage";
import NotFoundPage from "./modules/notfound/NotFoundPage";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LoginPage from "./modules/auth/LoginPage";
import ForgotPassword from "./modules/auth/ForgotPassword";
import ResetPassword from "./modules/auth/ResetPassword";
import EmptyLayout from "./components/layouts/EmptyLayout";
import ProductsPage from "./modules/products/ProductsPage";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
   <BrowserRouter>
    <Routes>

      {/* DASHBOARD LAYOUT */}
      <Route path="/" element={<DefaultLayout />}>
         <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        {/* categories */}
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>

      <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  )
}

export default App
