'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, ChevronLeft, MessageCircle, X, User, MapPin, Phone, Mail, Hash } from 'lucide-react';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import ProductCard from '@/components/sections/product-card';
import { Button } from '@/components/ui/button';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    pin: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCustomerChange = (e) => {
    setCustomerInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateAndSendWhatsApp = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = 'Name is required';
    if (!customerInfo.address.trim()) errors.address = 'Address is required';
    if (!customerInfo.pin.trim()) errors.pin = 'PIN code is required';
    if (!customerInfo.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(customerInfo.phone.trim())) errors.phone = 'Enter a valid 10-digit phone number';
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email.trim())) errors.email = 'Enter a valid email';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const phone = '919037498360';
    const productUrl = typeof window !== 'undefined' ? window.location.href : '';
    const msg = [
      `🛍️ *Order Enquiry — Minimal Human*`,
      ``,
      `👤 *Customer Details*`,
      `*Name:* ${customerInfo.name}`,
      `*Address:* ${customerInfo.address}`,
      `*PIN Code:* ${customerInfo.pin}`,
      `*Phone:* ${customerInfo.phone}`,
      customerInfo.email ? `*Email:* ${customerInfo.email}` : null,
      ``,
      `📦 *Product Details*`,
      `*Product:* ${product.name}`,
      `*Category:* ${product.category} (${product.gender})`,
      `*Price:* Rs${product.price.toFixed(2)}`,
      selectedSize ? `*Size:* ${selectedSize}` : `*Size:* Not selected yet`,
      `*Quantity:* ${quantity}`,
      `*Stock:* ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}`,
      ``,
      `*Product Link:* ${productUrl}`,
      ``,
      `Please confirm my order. Thank you! 🙏`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setShowOrderModal(false);
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data.data);

        if (data.data) {
          setActiveImage(data.data.image);
          // Fetch related products
          const relatedResponse = await fetch(
            `/api/products?category=${data.data.category}&limit=4`
          );
          const relatedData = await relatedResponse.json();
          setRelatedProducts(
            relatedData.data.filter((p) => p._id !== data.data._id).slice(0, 3)
          );
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const allImages = product
    ? [product.image, ...(product.images || [])].filter((url, index, self) => url && self.indexOf(url) === index)
    : [];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Product not found</h1>
            <Link href="/catalog">
              <Button variant="primary">Back to Catalog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/catalog"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Catalog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors mb-8"
          >
            <ChevronLeft size={20} />
            Back
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Viewer */}
            <div className="space-y-4">
              <motion.div
                className="bg-gray-100 rounded-lg overflow-hidden h-[400px] md:h-[500px] relative border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <motion.div
                  className="flex gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImage === img ? 'border-red-600 ring-2 ring-red-600/10' : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Product View ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Product Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-600">
                  {product.category} • {product.gender}
                </p>
              </div>

              {/* Name */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-black">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} / 5</span>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-6">
                <p className="text-4xl font-bold text-black">
                  Rs{product.price.toFixed(2)}
                </p>
                <p className="text-gray-600 mt-2">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>

              {/* Description Section */}
              <div className="space-y-2 border-t border-gray-200 pt-6">
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Select Size
                </label>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded font-medium text-sm transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'border border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!selectedSize || product.stock === 0}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>

                {/* WhatsApp Order Enquiry Button */}
                <button
                  type="button"
                  onClick={() => setShowOrderModal(true)}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded font-bold text-white text-sm tracking-wide transition-all duration-200 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={20} strokeWidth={2.5} />
                  Order via WhatsApp
                </button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Wishlist
                </Button>
              </div>

              {/* Features */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-4">Features</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Premium quality materials</li>
                  <li>✓ Comfortable fit for all-day wear</li>
                  <li>✓ Easy care and maintenance</li>
                  <li>✓ Sustainable production</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-black text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Related Products
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {relatedProducts.map((relProduct) => (
                <motion.div
                  key={relProduct._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={relProduct} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      {/* ── WhatsApp Order Modal ── */}
      <AnimatePresence>
        {showOrderModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOrderModal(false)}
            />

            {/* Modal Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 z-[90] w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-red-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                    <MessageCircle size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="font-black text-base text-black">Order via WhatsApp</h2>
                    <p className="text-xs text-gray-500">Fill your details to place an order</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Product Summary Badge */}
              <div className="mx-6 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                {product.image && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-black truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedSize ? `Size: ${selectedSize}` : 'No size selected'} &nbsp;·&nbsp; Qty: {quantity} &nbsp;·&nbsp; Rs{product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="px-6 pt-4 pb-6 space-y-4 max-h-[55vh] overflow-y-auto">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    <User size={12} /> Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    <MapPin size={12} /> Residential Address <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleCustomerChange}
                    placeholder="House No., Street, City, State"
                    rows={2}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition resize-none ${formErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>

                {/* PIN + Phone row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      <Hash size={12} /> PIN Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="pin"
                      value={customerInfo.pin}
                      onChange={handleCustomerChange}
                      placeholder="eg. 682001"
                      maxLength={6}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${formErrors.pin ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {formErrors.pin && <p className="text-red-500 text-xs mt-1">{formErrors.pin}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      <Phone size={12} /> Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    <Mail size={12} /> Email <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleCustomerChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={validateAndSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-black text-white text-base tracking-wide transition-all duration-200 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] shadow-lg mt-2"
                >
                  <MessageCircle size={22} strokeWidth={2.5} />
                  Send Order on WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 -mt-1">
                  WhatsApp will open with your details pre-filled. Just press Send!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
