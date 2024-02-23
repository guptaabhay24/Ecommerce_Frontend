import React from "react";
import {Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home";
import { Box } from "@mui/material";
import Cart from "./pages/Cart.tsx";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import Checkout from "./pages/Checkout.tsx";

const App: React.FC = () => {
  return (
    <ShoppingCartProvider>
    <Box
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </Box>
    </ShoppingCartProvider>
  );
};

export default App;
