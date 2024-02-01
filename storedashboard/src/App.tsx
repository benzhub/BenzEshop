import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Customer from "./pages/Customer";
import Order from "./pages/Order";
import Product from "./pages/Product";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="order" element={<Order />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
