import { Box, Typography, Button } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useLocation } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  count: number;
  category:string;
}

interface ProductProps {
  product: Product;
  i: number;
}

const SingleProduct = ({ product, i }: ProductProps) => {
  const { addToCart, removeFromCart } = useShoppingCart();
  let location = useLocation();
  const handleAddToCart = (product:Product) => {
    addToCart(product);
  };
  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <Box key={product.id} sx={productStyles}>
      <img
        className="image-pdt"
        src={product.images[0]}
        alt={`Product :${i + 1}`}
        style={{ height: "200px", width: "300px", objectFit: "contain" }}
      />
      <Box sx={priceandratingStyles}>
        <Typography fontWeight="bold" fontSize="1.2rem">
          {product.title.length > 16
            ? `${product.title.substring(0, 16)}...`
            : product.title}
        </Typography>
        <Typography
          sx={{ color: "green", fontWeight: "600", fontSize: "1.2rem" }}
        >
          ${product.price}
        </Typography>
        <Typography
          sx={{
            background: product.rating > 4 ? "green" : "#f1c40f",
            ...ratingsStyles,
          }}
        >
          {product.rating}⭐
        </Typography>
      </Box>
      {location.pathname === "/" ? (
        product.count > 1 ? (
          <Typography color="black">{product.count}</Typography>
        ) : (
          <Button
            variant="outlined"
            sx={buttonStyles}
            onClick={()=>handleAddToCart(product)}
            disabled={product.count > 1 ? true : false}
          >
            Add to Cart
          </Button>
        )
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Button
            sx={{ padding: "0px", borderRadius: "20%", background: "#e3e3e3" }}
            onClick={()=>handleRemoveFromCart(product.id)}
          >
            ➖
          </Button>
          <Typography fontSize="1.2rem" color="black" sx={{}}>
            {product.count}
          </Typography>
          <Button
            sx={{ padding: "0px", borderRadius: "20%", background: "#e3e3e3" }}
            onClick={()=>handleAddToCart(product)}
          >
            ➕
          </Button>
        </Box>
      )}
    </Box>
  );
};

// Styles
const productStyles = {
  height: "380px",
  gap: "1.2rem",
  padding: "20px",
  border: "1px solid #e3e3e3",
  borderRadius: "20px",
  boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const priceandratingStyles = {
  display: "flex",
  gap: "0.9rem",
  alignItems: "center",
  marginTop: "10px",
};

const ratingsStyles = {
  fontWeight: "600",
  fontSize: "0.8rem",
  padding: "4px 6px",
  color: "white",
  borderRadius: "8px",
};

const buttonStyles = {
  padding: "5px",
  alignSelf: "center",
  marginTop: "auto",
  fontSize: "0.9rem",
  textTransform: "capitalize",
  fontWeight: "bold",
  background: "lightyellow",
  color: "goldenrod",
  borderColor: "black",
  "&:active": {
    background: "#ffffe0",
  },
  "&:hover": {
    background: "#fff8dc",
    borderColor: "black",
  },
};

export default SingleProduct;
