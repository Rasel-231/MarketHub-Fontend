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
export interface ITimer {
  deadline: string;
}

export interface ISpecificationField {
    label: string;
    value: string;
}

export interface ISpecificationGroup {
    groupName: string;
    fields: ISpecificationField[];
}
export interface IAiAssistantResponse {
  reply: string;
  success: boolean;
  message: string;
  data: {
    reply: string;
    userName: string;
  };
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
export interface IReviewUser {
  comment: string;
  seller?: {
    profilePhoto?: string;
  };
}

export interface IReview {
  id: string;
  rating: number;
  productId: string;
  comment: string;
  user: IReviewUser;
  createdAt: string;
}
export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview[]
}
export interface IUserProducts {
  flashSaleEnd: string;
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  model?: string;
  discountAmount: number;
  sellingPrice: number;
  shopName?: string;
  size: string[];
  flashSalePrice: number;
  discountedRate: number;
  productActualPrice: number;
  colour: string[];
  specification:string,
  isFeatured:string,
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
export interface IMeta {
  page: number;
  limit: number;
  total: number;}

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
  _count?: {
    products: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAttribute {
  id:string;
  name: string; 
  categoryId: string; 
  label?: string; 
  groupName?: string
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ICategory[];
  };
}

export interface IAttributeResponse {
    success: boolean;
    message: string;
    data: IAttribute; // অথবা আপনার API যদি সরাসরি ডেটা পাঠায় তবে শুধু IAttribute
}

export interface ProductCardProps {
  product: IUserProducts;
  onAddToCart?: (product: IUserProducts) => void;
  onWishlist?: (productId: string) => void;
  isFlashSale?: boolean;
}

export interface ProductCardProps {
  product: IUserProducts;
  onWishlist?: (id: string) => void;
  onAddToCart?: (product: IUserProducts) => void;
  isFlashSale?: boolean;
}

export interface IFilterProps {
  categories: ICategory[];
  brands: string[];
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  setCurrentPage: (page: number) => void;
}

export interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export interface IContact {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  message: string;
  isSupport:boolean;
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
  flashSalePrice: number;
  product?: {
    id: string;
    title: string;
    images: string[];
  };
}

export interface IShopParams {
  [key: string]: unknown;
  page: number;
  limit: number;
  category: string;
  searchTerm: string;
  maxPrice: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
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
export interface IReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IReview[];
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
export type TOrderStatus = 
  | 'PENDING' | 'ORDER_RECEIVED' | 'ORDER_PACKED' 
  | 'SENT_TO_WAREHOUSE' | 'RECEIVED_AT_WAREHOUSE' 
  | 'SENT_TO_DESTINATION' | 'DESTINATION_RECEIVED' 
  | 'RIDER_ASSIGNED' | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' | 'CANCELLED';

export interface IOrder {
  user?: {
    id: string;
    name: string;
    email?: string;
  };
  id: string;
  orderId?: string;
  riderName?:string;
  riderPhone?:string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: TOrderStatus;
  paymentStatus: "PAID" | "FAILED" | "UNPAID" | "REFUNDED";
  transactionId?: string;

  deliveryAddress?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  payment?: {
    id: string;
    transactionId: string;
    paymentMethod: string;
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

export interface IFlagResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IUserProducts[];
  };
}
export interface OrderFormData {
  name: string;
  companyName?: string;
  address: string;
  apartment?: string;
  city: string;
  phone: string;
  email: string;
  paymentMethod: string;
  saveInfo: boolean;
}

export interface IWishlist {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  products?: IUserProducts;
}

export interface IWishlistResponse {
  success: boolean;
  message: string;
  data: IWishlist | IWishlist[];
}

export interface IErrorResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources?: { path: string; message: string }[];
    stack?: string;
  };
}
