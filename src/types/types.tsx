export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type UserRole = "Admin" | "Seller" | "User";

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  role: UserRole;
  address?: string;
  admin?: {
    id: string;
    profilePhoto: string | null;
  };
  seller?: {
    id: string;
    profilePhoto: string | null;
    shopName: string | null;
    shopSlug: string | null;
  };
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: IUserResponse;
  };
}

export interface LoginData {
  email?: string;
  password?: string;
  [key: string]: unknown;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: UserRole;
  shopName?: string | null;
  shopSlug?: string | null;
  file?: File;
}

export interface IUserProfileResponse {
  success: boolean;
  message: string;
  data: IUserResponse;
}

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export interface IProps {
  showAll: boolean;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface IUserProducts {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating:number
  shopName?: string;
  size: string[];
  sellingPrice: number;
  discountedRate: number;
  productActualPrice: number;
  colour: string[];
  brand: string;
  images: string[];
  status: ProductStatus;
  userId: string;
  categoryId: string;
  sellerId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  user?: IUserResponse;
  category?: {
    id: string;
    name: string;
  };
  seller?: {
    id: string;
    shopName: string | null;
  };
  review?: IReview[];
  cartItems?: Record<string, unknown>[];
  orderItems?: Record<string, unknown>[];
}

export interface IUserProductsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: IMeta;
    data: IUserProducts[];
  };
}

export interface ICategory {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ICategory[];
  };
}

export interface IContact {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContactMessagesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IContact[];
}

export interface ICart {
  id?: string;
  cartId?: string;
  productId: string;
  quantity: number;
  sellingPrice: number;
  product?: {
    id: string;
    title: string;
    images: string[];
  };
}

export interface ICartResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: ICart[]; 
    totalAmount: number;
  };
}


export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    title: string;
    images: string[];
  };
}

export interface IOrder {
  id: string;
  orderId?: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'FAILED' | 'UNPAID' | 'REFUNDED';
  transactionId?: string;
  
  deliveryAddress?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  payment?: {
    id: string;
    transactionId: string;
    paymentMethod:string
    amount: number;
    paymentStatus: string;
  };
}

export interface IOrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IOrder | IOrder[]; 
}


export interface OrderFormData  {
  name: string;
  companyName?: string;
  address: string;
  apartment?: string;
  city: string;
  phone: string;
  email: string;
  paymentMethod: string;
  saveInfo: boolean;
};