'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import AdminSidebar from '@/components/layouts/admin-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductForm from '@/components/sections/product-form';
import ConfirmDialog from '@/components/ui/confirm-dialog';

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch('/api/products?limit=100');
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-black">Products</h1>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 text-sm"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Products Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-black">
                  All Products ({filteredProducts.length})
                </h2>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No products found</p>
                    <Button
                      variant="primary"
                      onClick={() => setShowForm(true)}
                    >
                      Add First Product
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Stock
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Category
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Rating
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr
                            key={product._id}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-4 text-sm text-black font-medium">
                              {product.name}
                            </td>
                            <td className="py-4 px-4 text-sm text-black">
                              Rs{product.price.toFixed(2)}
                            </td>
                            <td className="py-4 px-4 text-sm text-black">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  product.stock > 10
                                    ? 'bg-green-100 text-green-700'
                                    : product.stock > 0
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {product.stock}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-black">
                              {product.category}
                            </td>
                            <td className="py-4 px-4 text-sm text-black">
                              ⭐ {product.rating.toFixed(1)}
                            </td>
                            <td className="py-4 px-4 text-sm">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setShowForm(true);
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(product._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            fetchProducts();
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
