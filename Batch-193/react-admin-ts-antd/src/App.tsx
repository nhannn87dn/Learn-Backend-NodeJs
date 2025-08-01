import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './App.css'
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './modules/dashboard/DashboardPage';
import NotFoundPage from './modules/notfound/NotFoundPage';
import LoginPage from './modules/auth/LoginPage';
import ProductsPage from './modules/products/ProductsPage';

// Create a client
const queryClient = new QueryClient()

function App() {
 

  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
     </BrowserRouter>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
