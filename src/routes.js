import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import LandingPage from "./pages/landingPage";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";

function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homePage" element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/cart-page" element={<CartPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    );
  }

export default AppRoutes;