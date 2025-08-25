import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  Loader2
} from 'lucide-react';
import { adminApi } from '../../services/api';
import { formatCurrency } from '../../utils/currency';

const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats()
  });

  const quickActions = [
    {
      title: 'Add Product',
      description: 'Create a new product listing',
      icon: Plus,
      href: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'View Orders',
      description: 'Check recent customer orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Users',
      description: 'View and manage customer accounts',
      icon: Users,
      href: '/admin/users',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed sales analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.data?.totalProducts || 0}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.data?.totalOrders || 0}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.data?.totalUsers || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats?.data?.totalRevenue || 0)}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`${action.color} p-3 rounded-full`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
                         {stats?.data?.recentOrders && stats.data.recentOrders.length > 0 ? (
               <div className="space-y-4">
                 {stats.data.recentOrders.slice(0, 5).map((order: any) => (
                  <div key={order._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(order.total)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
            <div className="mt-4">
              <Link
                to="/admin/orders"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View all orders →
              </Link>
            </div>
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Products</h3>
          </div>
          <div className="p-6">
                         {stats?.data?.lowStockProducts && stats.data.lowStockProducts.length > 0 ? (
               <div className="space-y-4">
                 {stats.data.lowStockProducts.slice(0, 5).map((product: any) => (
                  <div key={product._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                                             <p className="text-sm text-gray-600">
                         Stock: {product.stock || 0}
                       </p>
                    </div>
                    <Link
                      to={`/admin/products`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">All products are well stocked</p>
            )}
            <div className="mt-4">
              <Link
                to="/admin/products"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Manage products →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {stats?.data?.monthlyStats?.orders || 0}
              </p>
              <p className="text-sm text-gray-600">Orders this month</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats?.data?.monthlyStats?.revenue || 0)}
                </p>
              <p className="text-sm text-gray-600">Revenue this month</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {stats?.data?.monthlyStats?.customers || 0}
              </p>
              <p className="text-sm text-gray-600">New customers</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
