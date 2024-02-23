import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {priceCalc} from '../utils/priceCalc';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  address: string;
  phoneNumber: any;
  cardNumber: any;
  expiration:any;
  cvv:any;
}

const Checkout: React.FC = () => {
  const { cart,setCart } = useShoppingCart();
  const [orderPlaced,setOrderPlaced] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  let total = priceCalc(cart);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phoneNumber: undefined,
    cardNumber: undefined,
    expiration: undefined,
    cvv: undefined,
  });

  const [formErrors, _setFormErrors] = useState<Record<string, boolean>>({
    name: false,
    address: false,
    phoneNumber: false,
    cardNumber: false,
    expiration: false,
    cvv: false,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    const isNumericField = [
      "phoneNumber",
      "cardNumber",
      "expiration",
      "cvv",
    ].includes(name);
    const parsedValue =
      isNumericField && value !== "" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setOrderPlaced(true);
    setFormData({  
    name: "",
    address: "",
    phoneNumber: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  })
  localStorage.setItem("shoppingCart", JSON.stringify([]));
  setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      navigate('/');
    }, 2000);
  };

  return (
  <>
  {
    orderPlaced && (
      <Snackbar open={orderPlaced} autoHideDuration={6000}>
      <Alert  severity="success" sx={{ width: '100%' }}>
        Congrats, Order Placed !
      </Alert>
      </Snackbar>
    )
  }
    <Container sx={{...checkoutPageStyles, flexDirection:isSmallScreen ? "column":"row"}}>
      <Grid sx={{...checkoutPayStyles,  marginTop:isSmallScreen?"5rem": "-5rem"}}>
        <Typography
          fontWeight="500"
          fontSize={isSmallScreen ? "1.6rem" :"1.9rem"}
          fontFamily="sans-serif"
          textAlign="center"
        >
          Total Payout:
          <span style={{ color: "#067d62", fontWeight: "bold" }}>
            ${total.toFixed(2)}
          </span>
        </Typography>
        {cart.map((item, idx) => (
          <Typography key={idx} padding="5px 5px" fontSize="1.2rem">
            {item.title} ({item.count})
          </Typography>
        ))}
      </Grid>
      <Box component="form" sx={formStyles} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          variant="standard"
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={formErrors.name}
          helperText={formErrors.name ? "Name is required" : ""}
          required
        />
        <TextField
          label="Address"
          fullWidth
          variant="standard"
          margin="normal"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={formErrors.address}
          helperText={formErrors.address ? "Address is required" : ""}
          required
        />
        <TextField
          label="Phone Number"
          fullWidth
          variant="standard"
          margin="normal"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          error={formErrors.phoneNumber}
          helperText={formErrors.phoneNumber ? "Phone Number is required" : ""}
          type="number"
          required
        />
        <TextField
          label="Card Number"
          fullWidth
          variant="standard"
          margin="normal"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          error={formErrors.cardNumber}
          helperText={formErrors.cardNumber ? "Card Number is required" : ""}
          type="number"
          required
        />
        <Box display="flex" gap="10px">
          <TextField
            label="MM-YYYY"
            fullWidth
            variant="standard"
            margin="normal"
            name="expiration"
            value={formData.expiration}
            onChange={handleInputChange}
            error={formErrors.expiration}
            helperText={formErrors.expiration ? "Expiration is required" : ""}
            required
          />
          <TextField
            label="CVV"
            fullWidth
            variant="standard"
            margin="normal"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            error={formErrors.cvv}
            helperText={formErrors.cvv ? "CVV is required" : ""}
            type="number"
            required
          />
        </Box>
        <Button
          type="submit"
          variant="outlined"
          className="btn"
          style={buttonStyles}
        >
          Place Order
        </Button>
      </Box>
    </Container>
    </>
  );
};

const checkoutPageStyles = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const checkoutPayStyles = {
  border: "1px solid grey",
  padding: "30px",
  boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
  borderRadius: "20px",
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "350px",
  gap: "10px",
  // margin: "auto",
};

const buttonStyles = {
  marginTop:'20px',
  alignSelf:"center",
  borderColor: "black",
  color: "black",
  "&:active": {
    background: "black",
    color: "white",
    border: "none",
  },
  "&:hover": {
    background: "black",
    borderColor: "black",
    color: "white",
  },
};

export default Checkout;
