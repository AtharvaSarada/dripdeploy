import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  Product, 
  Order, 
  ApiResponse, 
  DashboardStats, 
  PaymentIntent,
  Address 
} from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (userData: { name: string; email: string; password: string }): Promise<{ success: boolean; token: string; user: User }> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<{ success: boolean; token: string; user: User }> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  googleLogin: async (token: string): Promise<{ success: boolean; token: string; user: User }> => {
    const response = await api.post('/auth/google', { token });
    return response.data;
  },

  getCurrentUser: async (): Promise<{ success: boolean; user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Products API
export const productsApi = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Admin product methods
  getAll: async (params?: { 
    limit?: number; 
    category?: string; 
    search?: string; 
    sortBy?: string; 
    sortOrder?: string;
  }): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  create: async (productData: any): Promise<ApiResponse<Product>> => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  update: async (id: string, productData: any): Promise<ApiResponse<Product>> => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  addReview: async (productId: string, review: { rating: number; comment: string }): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.post(`/products/${productId}/reviews`, review);
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<Order[]>> => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  getOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  createOrder: async (orderData: {
    items: any[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: { type: string; id: string };
    subtotal: number;
    tax: number;
    shippingCost: number;
  }): Promise<ApiResponse<Order>> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  updateOrderStatus: async (id: string, statusData: {
    status: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    notes?: string;
  }): Promise<ApiResponse<Order>> => {
    const response = await api.put(`/orders/${id}/status`, statusData);
    return response.data;
  },

  cancelOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },
};

// Payments API
export const paymentsApi = {
  createPaymentIntent: async (data: { amount: number; orderId?: string }): Promise<ApiResponse<PaymentIntent>> => {
    const response = await api.post('/payments/create-payment-intent', data);
    return response.data;
  },

  confirmPayment: async (data: { paymentIntentId: string; orderId?: string }): Promise<ApiResponse<any>> => {
    const response = await api.post('/payments/confirm', data);
    return response.data;
  },

  getPaymentMethods: async (): Promise<ApiResponse<{ methods: string[] }>> => {
    const response = await api.get('/payments/methods');
    return response.data;
  },

  createRefund: async (data: { paymentIntentId: string; amount?: number; reason?: string }): Promise<ApiResponse<any>> => {
    const response = await api.post('/payments/refund', data);
    return response.data;
  },
};

// Users API
export const usersApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  addAddress: async (address: Omit<Address, '_id'>): Promise<ApiResponse<Address[]>> => {
    const response = await api.post('/users/addresses', address);
    return response.data;
  },

  updateAddress: async (addressId: string, address: Partial<Address>): Promise<ApiResponse<Address[]>> => {
    const response = await api.put(`/users/addresses/${addressId}`, address);
    return response.data;
  },

  deleteAddress: async (addressId: string): Promise<ApiResponse<Address[]>> => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },

  addToWishlist: async (productId: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.post(`/users/wishlist/${productId}`);
    return response.data;
  },

  removeFromWishlist: async (productId: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  },

  getWishlist: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/users/wishlist');
    return response.data;
  },
};

// Admin API
export const adminApi = {
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<ApiResponse<Order[]>> => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string): Promise<ApiResponse<Order>> => {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },



  getSalesAnalytics: async (params?: {
    period?: string;
    limit?: number;
  }): Promise<ApiResponse<any>> => {
    const response = await api.get('/admin/analytics/sales', { params });
    return response.data;
  },

         getInventoryAnalytics: async (): Promise<ApiResponse<any>> => {
         const response = await api.get('/admin/analytics/inventory');
         return response.data;
       },
       createUser: async (userData: any): Promise<ApiResponse<User>> => {
         const response = await api.post('/admin/users', userData);
         return response.data;
       },
       deleteUser: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
         const response = await api.delete(`/admin/users/${userId}`);
         return response.data;
       },
     };

export default api;
