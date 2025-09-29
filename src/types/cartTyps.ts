import { ProductType } from "./product.type";

export interface CartProduct {
  count: number;
  _id: string;
  price: number;
  product: {
    _id: string;
    id: string;
    title: string;
    quantity: number;
    imageCover: string;
    ratingsAverage: number;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
  };
}

// types/cart.type.ts
export type CartContextType = {
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  loading: boolean;
  btnDisable: boolean;
  getUserCart: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, count: number) => Promise<void>;
  clear: () => Promise<void>;
  clearloader: boolean;

  wishlist: ProductType[];
  setwishlist: React.Dispatch<React.SetStateAction<ProductType[]>>;
  toggleWishlist: (product: ProductType) => void;
};
