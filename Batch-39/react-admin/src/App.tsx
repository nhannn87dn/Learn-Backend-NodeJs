import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./component/layouts/LayoutAdmin";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import ProductPage from "./pages/ProductPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Order from "./pages/Order";
import OrderDetails from "./pages/Order/OrderDetails";
import TestUpload from "./pages/TestUpload";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutAdmin />}>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="orders" element={<Order />} />
              <Route path="orders/:id" element={<OrderDetails />} />
              <Route path="upload" element={<TestUpload />} />
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
