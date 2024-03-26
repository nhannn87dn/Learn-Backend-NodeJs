import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import LayoutAdmin from "./component/layouts/LayoutAdmin";
import CategoriesPage from "./pages/CategoriesPage";
import BrandsPage from "./pages/BrandsPage";
import ProductsPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomersPage";
import StaffsPage from "./pages/StaffsPage";
import OrdersPage from "./pages/OrdersPage";
import ProductEditPage from "./pages/ProductPage/ProductEditPage";
import ProductAddPage from "./pages/ProductPage/ProductAddPage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutAdmin />}>
              <Route index element={<DashboardPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/add" element={<ProductAddPage />} />
              <Route path="/products/:id" element={<ProductEditPage />} />
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/staffs" element={<StaffsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
