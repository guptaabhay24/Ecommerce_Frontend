import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  count: number;
  category:string;
}


interface ShoppingCartContextType {
  cart: Product[];
  setCart:Dispatch<SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within the ShoppingCartProvider');
  }
  return context;
};

const CART_STORAGE_KEY = 'shoppingCart';

export const ShoppingCartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const saveCartToLocalStorage = (updatedCart: Product[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].count++;
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, count: 1 }];
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };

  const removeFromCart = (productId: number) => {
    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].count > 1) {
        updatedCart[existingItemIndex].count--;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, setCart,addToCart, removeFromCart, }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
