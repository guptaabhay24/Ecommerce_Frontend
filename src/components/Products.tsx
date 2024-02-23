import { Box, Typography, useMediaQuery } from "@mui/material";
import SingleProduct from "./SingleProduct";
import {motion} from 'framer-motion';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  count: number;
  category: string;
}

interface ProductsProps {
  products: Product[];
  filterPrice: any;
  filterCategory: string;
  filterRating: any;
}

const Products = ({ products, filterPrice, filterCategory, filterRating }: ProductsProps) => {
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

  const filteredProducts = products.filter((product) => {
    if (filterPrice !== "" && product.price > parseFloat(filterPrice)) {
      return false;
    }
    if (filterCategory !== "" && product.category !== filterCategory) {
      return false;
    }
    if (filterRating !== "" && product.rating > parseFloat(filterRating)) {
      return false;
    }
    return true;
  });

  if(filteredProducts.length===0){}

  return (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        margin: "3% 5%",
        gap: "3rem",
      }}
    >
      {
        filteredProducts.length ===0 &&    <Typography fontSize="2.2rem" margin="10% 55%" width="60vw">
        No such Products Found.
      </Typography> 
      }
      {filteredProducts.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <SingleProduct product={product} i={i} />
        </motion.div>
      ))}
    </Box>
  );
};

export default Products;
