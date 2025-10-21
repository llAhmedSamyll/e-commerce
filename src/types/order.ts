export  type Order = {
  id: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    city: string;
    details: string;
    phone: string;
  };
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      title: string;
      imageCover: string;
      brand?: {
        name: string;
      };
    };
  }[];
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  createdAt: string;
};
