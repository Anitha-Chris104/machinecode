import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "./components/common/Loader";
import ScrollProgress from "./components/common/ScrollProgress";
import BackToTop from "./components/common/BackToTop";
import Layout from "./components/Layout/Layout";
import Inquiries from "./pages/Admin/Inquiries";
import AdminProducts from "./pages/Admin/AdminProducts";
import AddProduct from "./pages/Admin/AddProduct";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoute";
import EditProduct from "./pages/Admin/EditProduct";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Contact = lazy(() => import("./pages/Contact"));
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />

      {!loading && (
        <>
          <ScrollProgress />
          <Suspense fallback={<Loader loading={true} />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/inquiries" element={<Inquiries />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/add" element={<AddProduct />} />

                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="products/edit/:id" element={<EditProduct />} />
                  <Route
                    path="/admin/products/edit/:id"
                    element={<AdminEditProduct />}
                  />
                </Route>
              </Route>
            </Routes>
          </Suspense>
          <BackToTop />
        </>
      )}
    </>
  );
}

export default App;
