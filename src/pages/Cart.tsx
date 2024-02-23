import { useShoppingCart } from "../context/ShoppingCartContext";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import { priceCalc } from "../utils/priceCalc";

const Cart = () => {
  const { cart } = useShoppingCart();
  let totalPrice = priceCalc(cart);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1100px)");

  const calculateColumns = () => {
    if (isSmallScreen) {
      return 1; 
    } else if (isMediumScreen) {
      return 2; 
    } else {
      return 3; 
    }
  };

  const numColumns = calculateColumns();

  return (
    <Box minHeight="40vh">
      {cart.length <= 0 ? (
        <Typography fontSize="2.2rem" margin="10% 33%" width="50%">
          Please add items in Cart.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "60vh",
            marginTop: "3rem",
          }}
        >
          <Box sx={cartWrapperStyles}>
            <Typography
              fontWeight="500"
              fontSize="1.4rem"
              fontFamily="sans-serif"
              textAlign="center"
            >
              Cart Subtotal :{" "}
              <span style={{ color: "#067d62", fontWeight: "bold" }}>
                ${totalPrice}
              </span>
            </Typography>
            <Link to="/checkout">
              <Button variant="outlined" sx={proceedBtnStyles}>
                Proceed to Pay
              </Button>
            </Link>
          </Box>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
              margin: "3% 8%",
              gap: "3rem",
            }}
          >
            {cart?.map((product, idx) => (
              <SingleProduct product={product} i={idx} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const cartWrapperStyles = {
  alignSelf: "flex-start",
  margin: "0 10%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  background: "#fdfdfd",
  width: "300px",
  height: "150px",
  padding: "30px",
  borderRadius: "10px",
  border: "1px solid grey",
  boxShadow: "1px 3px 8px -1px rgba(0,0,0,0.3)",
};

const proceedBtnStyles = {
  margin: "0 20%",
  alignSelf: "center",
  background: "#fb641b",
  color: "white",
  border: "none",
  textTransform: "capitalize",
  "&:hover": {
    background: "white",
    color: "#fb641b",
    borderColor: "black",
  },
};

export default Cart;
