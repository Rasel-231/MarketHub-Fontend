export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  brand: string;
  stock: number;
  totalrating: number;
  discount: string;
  rating: number;
  numReviews: number;
  images: string[];
  isFeatured: boolean;
  colors: string[];
  sizes: string[];
}