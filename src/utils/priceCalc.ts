interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    rating: number;
    count: number;
  }

export const priceCalc = (cart: Product[]): number => {
    return cart.reduce((acc, curr) => {
      return acc + curr.price * curr.count;
    }, 0);
  };
  
  export const cartCount = (cart:Product[]):number=>{
    return cart.reduce((acc, curr) => {
        return acc + curr.count;
      }, 0);
  }