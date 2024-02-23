import React, { useState, useEffect } from "react";
import Products from "../components/Products.tsx";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  count: number;
  category: string;
}

const PRODUCTS_STORAGE_KEY = "products";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filterPrice, setFilterPrice] = useState<number | "">("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterRating, setFilterRating] = useState<number | "">("");

  const getUniqueCategories = () => {
    const uniqueCategories = new Set<string>();
    products.forEach((product: any) => {
      uniqueCategories.add(product.category);
    });
    return Array.from(uniqueCategories);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Error while fetching");
      }
      const result = await response.json();
      if (Array.isArray(result.products)) {
        setProducts(result.products);
        localStorage.setItem(
          PRODUCTS_STORAGE_KEY,
          JSON.stringify(result.products)
        );
      }
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const filterDrawer = (
    <Drawer anchor="left" open={filterOpen} onClose={handleFilterClose}>
      <Box sx={{ width: "300px", padding: "16px" }}>
        <Typography variant="h5">Filters</Typography>
        <TextField
          label="Price"
          type="number"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value as any)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {/* Filter Category wise */}
        <FormControl fullWidth sx={formSelectStyles}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{margin:'0px 0px'}}
        >
          <MenuItem value="">All</MenuItem>
          {getUniqueCategories().map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        {/* Filter rating wise*/}
        <FormControl fullWidth sx={formSelectStyles}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Rating"
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value as number | "")}
          variant="outlined"
          fullWidth
          sx={{margin:'0px 0px'}}
          inputProps={{ style: { color: 'black' } }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        </FormControl>
        <Button variant="outlined" sx={buttonStyles} onClick={handleFilterClose}>
          Apply Filter
        </Button>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={homeContainerStyles}>
      <Button
        variant="outlined"
        sx={buttonStyles}
        onClick={handleFilterClick}
      >
        Filters <FaFilter />
      </Button>
      <Products
        products={products}
        filterPrice={filterPrice}
        filterCategory={filterCategory}
        filterRating={filterRating}
      />
      {filterDrawer}
    </Box>
  );
};

const homeContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
};

const formSelectStyles = {
  margin:"10px 0px",
}

const buttonStyles = {
  height: "40px",
  alignSelf: "center",
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


export default Home;
