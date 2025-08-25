import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Upload, X, Save, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { productsApi } from '../../services/api';
import { formatCurrency } from '../../utils/currency';
import { getSafeImageUrl, filesToDataUrls } from '../../utils/imageUtils';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
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
  stock: number;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  category: '',
  images: [],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White'],
  design: {
    type: 'graphic',
    description: '',
    placement: 'front'
  },
  materials: ['100% Cotton'],
  care: ['Machine wash cold', 'Tumble dry low'],
  isActive: true,
  isFeatured: false,
  stock: 0
};

const categories = [
  'comic', 'anime', 'vintage', 'retro', 'gaming', 'music', 'sports', 'art', 'minimalist', 'funny', 'geek', 'pop-culture', 'custom', 'limited-edition'
];

const AdminProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productsApi.getAll({ limit: 100 })
  });

  // Create product mutation
  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create product');
    }
  });

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) => 
      productsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully!');
      handleCloseModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update product');
    }
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete product');
    }
  });

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images || [],
        sizes: product.sizes || ['S', 'M', 'L', 'XL'],
        colors: product.colors || ['Black', 'White'],
        design: product.design || {
          type: 'graphic',
          description: '',
          placement: 'front'
        },
        materials: product.materials || ['100% Cotton'],
        care: product.care || ['Machine wash cold', 'Tumble dry low'],
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        stock: product.stock || 0
      });
      setImageUrls(product.images || []);
    } else {
      setEditingProduct(null);
      setFormData(initialFormData);
      setImageUrls([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(initialFormData);
    setImageUrls([]);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStockChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      stock: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      // Convert files to base64 strings for storage
      const newUrls = await filesToDataUrls(Array.from(files));
      
      setImageUrls(prev => [...prev, ...newUrls]);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newUrls] }));
      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage your DripNest product catalog</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.data?.map((product: any) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="aspect-square bg-gray-100 relative">
              {product.images?.[0] ? (
                <img
                  src={getSafeImageUrl(product.images[0])}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Upload className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {product.isFeatured && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {!product.isActive && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                              <p className="text-primary-600 font-bold mt-2">{formatCurrency(product.price)}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  Stock: {product.stock || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="input w-full"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materials
                  </label>
                  <input
                    type="text"
                    value={formData.materials.join(', ')}
                    onChange={(e) => handleInputChange('materials', e.target.value.split(',').map(s => s.trim()))}
                    className="input w-full"
                    placeholder="100% Cotton, Polyester"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="input w-full"
                  required
                />
              </div>

              {/* Design */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Details
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Design Type
                    </label>
                    <select
                      value={formData.design.type}
                      onChange={(e) => handleInputChange('design', { ...formData.design, type: e.target.value as 'graphic' | 'text' | 'custom' })}
                      className="input w-full"
                    >
                      <option value="graphic">Graphic</option>
                      <option value="text">Text</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placement
                    </label>
                    <select
                      value={formData.design.placement}
                      onChange={(e) => handleInputChange('design', { ...formData.design, placement: e.target.value as 'front' | 'back' | 'both' })}
                      className="input w-full"
                    >
                      <option value="front">Front</option>
                      <option value="back">Back</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.design.description}
                      onChange={(e) => handleInputChange('design', { ...formData.design, description: e.target.value })}
                      className="input w-full"
                      placeholder="e.g., Vintage rock band logo"
                    />
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={formData.care.join(', ')}
                  onChange={(e) => handleInputChange('care', e.target.value.split(',').map(s => s.trim()))}
                  className="input w-full"
                  placeholder="Machine wash cold, Tumble dry low"
                />
              </div>

              {/* Sizes and Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <label key={size} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('sizes', [...formData.sizes, size]);
                            } else {
                              handleInputChange('sizes', formData.sizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Colors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Black', 'White', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Yellow'].map(color => (
                      <label key={color} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.colors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('colors', [...formData.colors, color]);
                            } else {
                              handleInputChange('colors', formData.colors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

                             {/* Stock Level */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Total Stock
                 </label>
                 <input
                   type="number"
                   min="0"
                   value={formData.stock}
                   onChange={(e) => handleStockChange(parseInt(e.target.value) || 0)}
                   className="input w-full"
                   placeholder="Enter total stock quantity"
                 />
               </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {isUploading ? 'Uploading...' : 'Click to upload images or drag and drop'}
                    </p>
                  </label>
                </div>
                
                {/* Image Preview */}
                {imageUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <Save className="w-4 h-4" />
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
