import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import ProductCreate from "./pages/admin/ProductCreate";

import ProductEdit from "./pages/admin/ProductEdit";
import UserEdit from "./pages/admin/UserEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/shipping"
                element={<Shipping />}
              />

              <Route
                path="/payment"
                element={<Payment />}
              />

              <Route
                path="/placeorder"
                element={<PlaceOrder />}
              />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/products"
                element={<AdminProducts />}
              />
              
              <Route
                path="/admin/products/create"
                element={<ProductCreate />}
              />
              
              <Route
                path="/admin/products/:id/edit"
                element={<ProductEdit />}
              />

              <Route
                path="/admin/orders"
                element={<AdminOrders />}
              />

              <Route
                path="/admin/users"
                element={<AdminUsers />}
              />
              
              <Route
                path="/admin/users/:id/edit"
                element={<UserEdit />}
              />
              
            </Route>
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;