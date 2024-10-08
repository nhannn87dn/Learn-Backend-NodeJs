import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import ProductsPage from "./pages/ProductsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="products/:slug" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
