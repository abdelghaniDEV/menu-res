import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import CreateProducts from "./components/CreateProducts";
import Products from "./pages/Products";
import CreateCategory from "./components/CreateCategory";
import EditCategory from "./components/EditCategory";
import EditProduct from "./components/EditProduct";
import { Navigate, Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories";
import 'react-toastify/dist/ReactToastify.css';
import { fetchProducts } from "./Redux/slices/products.slice";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./Redux/slices/categories.slice";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tokenMenu");
  console.log(token)
  return token ? children : <Navigate to="/login" />
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <div className="container py-3">
              <Header />
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="categories" element={<Categories />} />
              </Routes>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
