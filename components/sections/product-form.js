'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/lib/validation/schemas';

export default function ProductForm({ product, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const [imagesList, setImagesList] = useState(product?.images || []);
  const [manualUrl, setManualUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();
        if (!res.ok) {
          setError(result.error || 'Failed to upload image');
          continue;
        }

        const newUrl = result.url;
        setImagesList((prev) => {
          const updated = [...prev, newUrl];
          return updated;
        });

        if (!imagePreview) {
          setImagePreview(newUrl);
        }
      }
    } catch (err) {
      setError('An error occurred during file upload.');
    } finally {
      setUploading(false);
    }
  };

  const addManualUrl = () => {
    if (!manualUrl) return;
    setImagesList((prev) => [...prev, manualUrl]);
    if (!imagePreview) {
      setImagePreview(manualUrl);
    }
    setManualUrl('');
  };

  const removeImage = (indexToRemove) => {
    const imageUrl = imagesList[indexToRemove];
    const updated = imagesList.filter((_, i) => i !== indexToRemove);
    setImagesList(updated);

    if (imagePreview === imageUrl) {
      setImagePreview(updated[0] || '');
    }
  };

  const setPrimaryImage = (url) => {
    setImagePreview(url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      featured: false,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://via.placeholder.com/400',
      images: [],
    },
  });

  useEffect(() => {
    if (product) {
      Object.keys(product).forEach((key) => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt') {
          setValue(key, product[key]);
        }
      });
      setImagePreview(product.image);
      setImagesList(product.images || []);
    }
  }, [product, setValue]);

  useEffect(() => {
    setValue('image', imagePreview || 'https://via.placeholder.com/400');
  }, [imagePreview, setValue]);

  useEffect(() => {
    setValue('images', imagesList);
  }, [imagesList, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const method = product ? 'PUT' : 'POST';
      const url = product ? `/api/products/${product._id}` : '/api/products';

      const payload = {
        ...data,
        image: imagePreview || 'https://via.placeholder.com/400',
        images: imagesList,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save product');
        return;
      }

      onSuccess();
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Product Images (Upload one or more)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <div className="text-sm text-gray-600">
                {uploading ? (
                  <span className="text-red-600 font-semibold animate-pulse">Uploading to Cloudinary...</span>
                ) : (
                  <span>Drag & drop or <span className="text-red-600 font-semibold underline">browse</span> to upload multiple images</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB per file</p>
            </div>

            {/* Manual URL Input */}
            <div className="mt-3 flex gap-2">
              <input
                type="url"
                placeholder="Or enter image URL manually..."
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={addManualUrl}
                className="px-4 py-2 bg-black text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Add URL
              </button>
            </div>

            {/* Previews / Gallery */}
            {imagesList.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Gallery ({imagesList.length} image{imagesList.length !== 1 && 's'}) — click star to set as main thumbnail
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {imagesList.map((url, index) => {
                    const isPrimary = imagePreview === url;
                    return (
                      <div
                        key={index}
                        className={`relative group rounded-md border-2 overflow-hidden aspect-square ${
                          isPrimary ? 'border-red-600 ring-2 ring-red-600/20' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={url}
                          alt={`Product thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(url)}
                            title="Set as Main"
                            className={`p-1 rounded-full text-xs transition-colors ${
                              isPrimary ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-red-50'
                            }`}
                          >
                            ★
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            title="Delete"
                            className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        {isPrimary && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] px-1 py-0.5 rounded font-black uppercase tracking-wider shadow">
                            Main
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>


          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Product Name
              </label>
              <Input
                {...register('name')}
                placeholder="e.g., Classic White T-Shirt"
                error={errors.name?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Slug
              </label>
              <Input
                {...register('slug')}
                placeholder="e.g., classic-white-tshirt"
                error={errors.slug?.message}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              placeholder="Product description..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Price
              </label>
              <Input
                {...register('price', { valueAsNumber: true })}
                type="number"
                placeholder="99.99"
                step="0.01"
                error={errors.price?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Stock
              </label>
              <Input
                {...register('stock', { valueAsNumber: true })}
                type="number"
                placeholder="10"
                error={errors.stock?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Rating
              </label>
              <Input
                {...register('rating', { valueAsNumber: true })}
                type="number"
                placeholder="4.5"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          {/* Category and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>Men</option>
                <option>Women</option>
                <option>New Arrivals</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Gender
              </label>
              <select
                {...register('gender')}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>Men</option>
                <option>Women</option>
                <option>Unisex</option>
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Available Sizes (comma-separated)
            </label>
            <Input
              {...register('sizes', {
                setValueAs: (value) =>
                  typeof value === 'string'
                    ? value.split(',').map((s) => s.trim())
                    : value,
              })}
              placeholder="XS, S, M, L, XL, XXL"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('featured')}
              className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
            />
            <label className="text-sm font-medium text-black">
              Mark as Featured Product
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="flex-1"
            >
              {loading
                ? 'Saving...'
                : product
                ? 'Update Product'
                : 'Add Product'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
