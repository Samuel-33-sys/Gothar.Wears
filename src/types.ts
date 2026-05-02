export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  tags?: string[];
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
