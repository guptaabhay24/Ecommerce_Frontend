import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { cartCount } from "../utils/priceCalc";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { cart } = useShoppingCart();
  let cartItems = cartCount(cart);
  useEffect(() => {
    const cartLabel = document.querySelector(".cartLabel");
    if (cartLabel && cartItems > 0) {
      cartLabel.classList.add("jiggle");
      setTimeout(() => {
        cartLabel.classList.remove("jiggle");
      }, 300);
    }
  }, [cartItems]);
  return (
    <AppBar sx={appBarStyles}>
      <Toolbar sx={toolbarStyles}>
        <Box sx={boxStyles}>
          <Link to="/">
            <Typography variant="h4" sx={titleStyles}>
              ShopHub
            </Typography>
          </Link>
          <Box sx={cartAndLoginStyles}>
            <Link to="/cart">
              <Typography
                className="cartLabel"
                variant="h5"
                sx={{ position: "relative", fontWeight: "600" }}
              >
                Cart 🛒
                {cartItems > 0 && (
                  <span
                    style={{
                      fontSize: "1rem",
                      position: "absolute",
                      bottom: "-5px",
                      fontWeight: "bold",
                      color: "darkblue",
                    }}
                  >
                    ({cartItems})
                  </span>
                )}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const appBarStyles = {
  position: "sticky",
  background: "none",
  color: "black",
  display: "flex",
  justifyContent: "center",
  boxShadow: "none",
  marginTop: "10px",
};

const toolbarStyles = {
  background: "#f2f2f2",
  opacity: "0.9",
  width: "80%",
  margin: "0 10%",
  border: "2px solid",
  borderRadius: "15px",
  boxShadow: "0px 3px 4px 3px rgba(0, 0, 0, 0.1)",
};

const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const titleStyles = {
  fontSize: "1.6rem",
  fontFamily: "cursive",
  fontWeight: 600,
};

const cartAndLoginStyles = {
  // width: "25%",
  display: "flex",
  alignItems: "center",
  marginRight: "2em",
};


export default Navbar;
