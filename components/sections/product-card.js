'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-white overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all duration-300 shadow-md hover:shadow-xl card-shine"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-64 md:h-80 bg-gray-100 overflow-hidden group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 font-black text-[9px] md:text-xs tracking-widest uppercase shadow-lg">
            ★ Featured
          </div>
        )}
        {!product.featured && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-600 text-white px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs font-bold tracking-wide">
            NEW
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-5">
        {/* Category */}
        <p className="text-[9px] md:text-xs text-red-600 uppercase tracking-widest font-black mb-1 md:mb-3">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="text-sm md:text-lg font-bold text-black mb-1 md:mb-3 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Rating — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-current' : ''}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <p className="text-base md:text-xl font-bold text-black">
            Rs{product.price.toFixed(2)}
          </p>
          <p className="text-[9px] md:text-xs text-gray-600 hidden sm:block">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 md:gap-2">
          <Link href={`/product/${product._id}`} className="flex-1">
            <button className="w-full px-2 md:px-4 py-1.5 md:py-2 border border-black text-black rounded hover:bg-black hover:text-white transition-colors duration-200 text-xs md:text-sm font-medium">
              View
            </button>
          </Link>
          <button className="p-1.5 md:p-2 border border-black hover:bg-black hover:text-white transition-colors duration-200 rounded">
            <ShoppingCart size={15} className="md:hidden" />
            <ShoppingCart size={18} className="hidden md:block" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
