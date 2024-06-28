import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFoud";
import ProductForm from "./components/ProductForm";
import DashBoard from "./pages/admin/DashBoard";
import LayoutAdmin from "./components/LayoutAdmin";
import AuthForm from './components/AuthForm';
import PrivateRouter from "./components/PrivateRouter";
import LayoutClient from "./components/LayoutClient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm isRegister />} />

        <Route path="/" element={<LayoutClient />} >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* admin */}
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<DashBoard />} />
            <Route path="/admin/product-add" element={<ProductForm />} />
            <Route path="/admin/product-edit/:id" element={<ProductForm />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
