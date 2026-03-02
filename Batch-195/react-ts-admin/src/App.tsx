import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import DashboardPage from './modules/dashboard/DashboardPage';
import LoginPage from './modules/auth/LoginPage';
import ProductsPage from './modules/products/ProductsPage';
import DefaultLayout from './components/layouts/DefaultLayout';
import EmptyLayout from './components/layouts/EmptyLayout';
import NotFoundPage from './modules/common/NotFoundPage';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

function App() {

  return (
     <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
        <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
