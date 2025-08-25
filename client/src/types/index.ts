export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  isEmailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id?: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  design: {
    type: 'graphic' | 'text' | 'custom';
    description: string;
    placement: 'front' | 'back' | 'both';
  };
  materials: string[];
  care: string[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  numReviews: number;
  reviews: Review[];
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  stock: number;
  discountPercentage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: User;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: {
    type: 'stripe' | 'paypal';
    id: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
  };
  paymentResult?: {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
  };
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  itemCount?: number;
  orderAge?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyStats: {
    orders: number;
    revenue: number;
    customers: number;
  };
  recentOrders: Order[];
  lowStockProducts: Product[];
  topProducts: Array<{
    _id: string;
    totalSold: number;
    totalRevenue: number;
    product: Product;
  }>;
}

export interface PaymentIntent {
  clientSecret: string;
}

export interface StripePaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}
