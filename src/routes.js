import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewItem from "./pages/ViewItem";
import LandingPage from "./pages/LandingPage";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import CheckoutPage from "./pages/CheckoutPage";
import LoginSecurity from "./pages/LoginSecurity";
import Favorites from "./pages/Favorites";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login-security" element={<LoginSecurity />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/view-item/:id" element={<ViewItem />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
