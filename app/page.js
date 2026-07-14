'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, Minus, Star, Zap, Shield, Truck, MessageCircle, X, User, MapPin, Phone, Mail, Hash } from 'lucide-react';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import ProductCard from '@/components/sections/product-card';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';
import ScrollProgressBar from '@/components/ui/scroll-progress';

/* ─── Animated stat counter ─── */
function CountUp({ end, duration = 1.8, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Floating particle ─── */
function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showCatModal, setShowCatModal] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [catCustomer, setCatCustomer] = useState({ name: '', address: '', pin: '', phone: '', email: '' });
  const [catErrors, setCatErrors] = useState({});
  const [catImgUrls, setCatImgUrls] = useState(null); // kept for compat but unused
  const DEFAULT_CATEGORIES = [
    { id: 'men',          name: 'Men',          image: '/mens.webp' },
    { id: 'women',        name: 'Women',        image: '/womens.webp' },
    { id: 'new_arrivals', name: 'New Arrivals', image: '/new arrival.webp' },
  ];
  const [featuredCategories, setFeaturedCategories] = useState(DEFAULT_CATEGORIES);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?limit=6&sort=newest');
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Load admin-configured featured categories from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('featured_categories');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFeaturedCategories(parsed);
        }
      }
    } catch {}
  }, []);
  const faqItems = [
    { question: 'What is your return policy?', answer: 'We offer a 30-day return policy for all items. Products must be in original condition with tags attached.' },
    { question: 'How long is shipping?', answer: 'Standard shipping takes 5-7 business days. Express shipping available for 2-3 business days.' },
    { question: 'Do you offer COD?', answer: 'Yes, Cash on Delivery is available for select locations. Additional charges may apply.' },
    { question: 'How do I track my order?', answer: 'You will receive a tracking link via email once your order ships. You can also track orders in your account.' },
  ];

  const tickerItems = ['PREMIUM QUALITY', 'FREE RETURNS', 'MINIMAL DESIGN', 'FAST SHIPPING', 'MADE WITH LOVE', 'TIMELESS STYLE', 'CRAFTED TO LAST'];

  const stats = [
    { value: 10000, suffix: '+', label: 'Happy Customers' },
    { value: 200, suffix: '+', label: 'Products' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 5, suffix: '★', label: 'Avg. Rating' },
  ];

  const whyUs = [
    { icon: Star, title: 'Premium Quality', desc: 'Crafted with finest materials and attention to detail' },
    { icon: Shield, title: 'Modern Essentials', desc: 'Versatile designs that work with any wardrobe' },
    { icon: Zap, title: 'Comfort First', desc: 'Soft fabrics and perfect fit for all-day wear' },
    { icon: Truck, title: 'Fast Shipping', desc: 'Quick delivery to your doorstep, nationwide' },
  ];

  const particles = [
    { x: '8%', y: '20%', size: 10, delay: 0, color: 'rgba(220,38,38,0.25)' },
    { x: '88%', y: '15%', size: 14, delay: 1, color: 'rgba(220,38,38,0.15)' },
    { x: '75%', y: '65%', size: 8, delay: 2, color: 'rgba(239,68,68,0.20)' },
    { x: '15%', y: '70%', size: 12, delay: 0.5, color: 'rgba(220,38,38,0.12)' },
    { x: '50%', y: '10%', size: 6, delay: 1.8, color: 'rgba(185,28,28,0.18)' },
  ];

  const handleCatCustomerChange = (e) => {
    setCatCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCatErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const openCatWhatsApp = (category) => {
    setActiveCat(category);
    setCatCustomer({ name: '', address: '', pin: '', phone: '', email: '' });
    setCatErrors({});
    setShowCatModal(true);
  };

  const validateAndSendCatWhatsApp = () => {
    const errors = {};
    if (!catCustomer.name.trim()) errors.name = 'Name is required';
    if (!catCustomer.address.trim()) errors.address = 'Address is required';
    if (!catCustomer.pin.trim()) errors.pin = 'PIN code is required';
    if (!catCustomer.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(catCustomer.phone.trim())) errors.phone = 'Enter a valid 10-digit number';
    if (catCustomer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(catCustomer.email.trim())) errors.email = 'Enter a valid email';
    if (Object.keys(errors).length > 0) { setCatErrors(errors); return; }

    const waPhone = '919037498360';
    const msg = [
      `🛍️ *Order Enquiry — Minimal Human*`,
      ``,
      `👤 *Customer Details*`,
      `*Name:* ${catCustomer.name}`,
      `*Address:* ${catCustomer.address}`,
      `*PIN Code:* ${catCustomer.pin}`,
      `*Phone:* ${catCustomer.phone}`,
      catCustomer.email ? `*Email:* ${catCustomer.email}` : null,
      ``,
      `📦 *Product Details*`,
      `*Category:* ${activeCat?.name}`,
      `*Product No:* ${activeCat?.number}`,
      ``,
      `Please help me with this product. Thank you! 🙏`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    setShowCatModal(false);
  };

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative pt-1 pb-1 md:pt-4 md:pb-3 bg-white overflow-hidden min-h-[30vh] flex items-center">
        {/* Animated background blobs */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-red-600 rounded-full blur-[120px] opacity-[0.04] -top-60 -right-60 pointer-events-none"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-red-200 rounded-full blur-[100px] opacity-[0.08] -bottom-40 -left-40 pointer-events-none"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}

        {/* Hero content with parallax */}
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="text-xs md:text-sm font-black text-red-600 tracking-widest uppercase px-5 py-2 border-2 border-red-600"
              animate={{ borderColor: ['#DC2626', '#B91C1C', '#DC2626'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ★ Welcome to Minimal Human ★
            </motion.p>
          </motion.div>

          {/* Headline — letter-by-letter stagger */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-8xl font-black text-black mb-6 md:mb-8 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            CLASSIC ELEGANCE
            <br />
            <motion.span
              className="text-red-600"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              MEETS
            </motion.span>{' '}SIMPLICITY
          </motion.h1>

          <motion.p
            className="text-base md:text-2xl text-black mb-3 md:mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            You are now part of Minimalism.
          </motion.p>
          <motion.p
            className="text-sm md:text-lg text-gray-700 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Premium essential wear designed with purpose. Every piece crafted for timeless style, supreme comfort, and uncompromising quality.
          </motion.p>

          {/* CTA Buttons — hidden on mobile, visible on sm+ */}
          <motion.div
            className="hidden sm:flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/catalog">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="primary" size="lg" className="group px-8 py-4 text-base animate-pulse-glow">
                  EXPLORE COLLECTION
                  <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" size={22} />
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="secondary" size="lg" className="px-8 py-4 text-base">
                  OUR STORY
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-red-600 max-w-xs mx-auto"
          />
        </motion.div>
      </section>

      {/* ─── TICKER MARQUEE — hidden on mobile ─── */}
      <div className="hidden sm:block bg-black border-y-2 border-red-600 py-3 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-inner animate-ticker select-none">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 mx-8 text-white font-black text-xs tracking-widest uppercase">
                <span className="text-red-600">★</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── STATS SECTION — hidden on mobile ─── */}
      <section className="hidden md:block py-12 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={i} variant="fade-up" delay={i * 0.1}>
                <div className="text-center group">
                  <p className="text-3xl md:text-5xl font-black text-black mb-1 group-hover:text-red-600 transition-colors duration-300">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CATEGORIES ─── */}
      <section className="py-16 md:py-28 bg-red-600 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              FEATURED COLLECTIONS
            </h2>
            <p className="text-white/90 text-lg font-semibold tracking-wide">Curated essentials for every lifestyle</p>
          </ScrollReveal>

          {/* Dynamic grid — 2 cols mobile, up to 3 cols desktop */}
          <div className={`grid gap-3 sm:gap-5 md:gap-8 ${
            featuredCategories.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-2 sm:grid-cols-3'
          }`}>
            {featuredCategories.map((category, i) => {
              // Last item spans full width on mobile when total count is odd & >1
              const isLastOdd = featuredCategories.length > 1 && featuredCategories.length % 2 !== 0 && i === featuredCategories.length - 1;
              return (
                <ScrollReveal
                  key={category.id}
                  variant="zoom-in"
                  delay={i * 0.12}
                  className={isLastOdd ? 'col-span-2 sm:col-span-1' : ''}
                >
                  <div className="relative group">
                    <Link href={`/catalog?category=${category.name}`}>
                      <motion.div
                        className="relative h-64 sm:h-72 md:h-96 bg-white overflow-hidden cursor-pointer shadow-xl card-shine"
                        whileHover={{ scale: 1.03, boxShadow: '0 30px 60px rgba(0,0,0,0.25)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                          priority={i < 3}
                          unoptimized={category.image?.startsWith('http')}
                        />
                      </motion.div>
                    </Link>

                    {/* WhatsApp button — mobile only */}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); openCatWhatsApp({ ...category, number: i + 1 }); }}
                      className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-white text-xs tracking-wide bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg active:scale-95 transition-all z-10 whitespace-nowrap"
                    >
                      <MessageCircle size={13} strokeWidth={2.5} />
                      Order via WhatsApp
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── RECOMMENDED PRODUCTS ─── */}
      <section className="py-16 md:py-28 bg-white" id="premium-selection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Selection heading — hidden on mobile */}
          <ScrollReveal variant="fade-up" className="hidden md:block text-center mb-12 md:mb-16">
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="inline-block h-1 w-12 md:w-16 bg-red-600" />
              <span className="text-red-600 font-black text-xs md:text-sm tracking-widest uppercase">Premium Selection</span>
              <span className="inline-block h-1 w-12 md:w-16 bg-red-600" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black mb-4 tracking-tight">
              HANDPICKED ESSENTIALS
            </h2>
            <p className="text-gray-700 text-lg font-semibold">Discover our most coveted pieces</p>
          </ScrollReveal>

          <div className="hidden md:block">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 md:h-96 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
                {products.map((product, i) => (
                  <ScrollReveal key={product._id} variant="fade-up" delay={i * 0.07}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal variant="fade-up" className="text-center">
                <Link href="/catalog">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button variant="outline" size="lg">
                      View All Products
                      <ChevronRight className="ml-2" size={20} />
                    </Button>
                  </motion.div>
                </Link>
              </ScrollReveal>
            </>
          )}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY — hidden on mobile ─── */}
      <section className="hidden md:block py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <ScrollReveal variant="fade-right">
              <motion.div
                className="bg-gray-50 h-96 md:h-[450px] rounded-lg overflow-hidden relative flex items-center justify-center border border-gray-100 shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Image
                  src="/logo.png"
                  alt="Minimal Human Logo"
                  fill
                  className="object-contain p-12 md:p-16"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 to-transparent pointer-events-none" />
              </motion.div>
            </ScrollReveal>
            <ScrollReveal variant="fade-left" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Philosophy</h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                At Minimal Human, we believe that true style lies in simplicity and quality. Every piece is carefully designed to become a staple in your wardrobe—timeless, versatile, and undeniably comfortable.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Less noise. More style. We&apos;re committed to crafting essentials that work as hard as you do, designed for everyday confidence.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Button variant="primary" size="lg">Discover Our Story</Button>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US — hidden on mobile ─── */}
      <section className="hidden md:block py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Why Choose Us</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} variant="fade-up" delay={i * 0.1}>
                  <motion.div
                    className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 hover:border-red-600 transition-colors group cursor-default"
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-red-600 transition-colors duration-300">
                      <Icon size={20} className="text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-sm md:text-xl font-semibold text-black mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={index * 0.08}>
                <motion.div
                  className="border border-gray-200 rounded-lg overflow-hidden"
                  whileHover={{ borderColor: '#DC2626' }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-gray-50 transition-colors text-left"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-black">{item.question}</h3>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <Plus size={22} className={openFAQ === index ? 'text-red-600' : 'text-gray-400'} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFAQ === index && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 border-t border-gray-200 pt-3">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND QUOTE ─── */}
      <section className="py-20 md:py-32 bg-black text-white overflow-hidden relative">
        <motion.div
          className="absolute inset-0 opacity-5 pointer-events-none"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #DC2626 0px, #DC2626 1px, transparent 0px, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal variant="zoom-in">
            <motion.blockquote
              className="text-2xl sm:text-4xl md:text-6xl font-light mb-6 md:mb-8 leading-tight"
              whileInView={{ opacity: 1 }}
            >
              &ldquo;We don&apos;t design clothes.
              <motion.span
                className="block text-red-600 font-semibold mt-4"
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                We design confidence.
              </motion.span>
            </motion.blockquote>
            <p className="text-gray-400 text-lg">— Minimal Human</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── NEWSLETTER removed ─── */}

      <Footer />

      {/* ─── CATEGORY WHATSAPP MODAL ─── */}
      <AnimatePresence>
        {showCatModal && activeCat && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCatModal(false)}
            />

            {/* Modal Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 z-[90] w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            >
              {/* Header */}
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
                <button onClick={() => setShowCatModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Product Summary Badge */}
              <div className="mx-6 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm">#{activeCat.number}</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-black">{activeCat.name} Collection</p>
                  <p className="text-xs text-gray-500">Product No: {activeCat.number} · Minimal Human</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="px-6 pt-4 pb-6 space-y-4 max-h-[55vh] overflow-y-auto">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    <User size={12} /> Name <span className="text-red-600">*</span>
                  </label>
                  <input type="text" name="name" value={catCustomer.name} onChange={handleCatCustomerChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${catErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {catErrors.name && <p className="text-red-500 text-xs mt-1">{catErrors.name}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    <MapPin size={12} /> Residential Address <span className="text-red-600">*</span>
                  </label>
                  <textarea name="address" value={catCustomer.address} onChange={handleCatCustomerChange}
                    placeholder="House No., Street, City, State" rows={2}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition resize-none ${catErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {catErrors.address && <p className="text-red-500 text-xs mt-1">{catErrors.address}</p>}
                </div>

                {/* PIN + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      <Hash size={12} /> PIN Code <span className="text-red-600">*</span>
                    </label>
                    <input type="text" name="pin" value={catCustomer.pin} onChange={handleCatCustomerChange}
                      placeholder="eg. 682001" maxLength={6}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${catErrors.pin ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {catErrors.pin && <p className="text-red-500 text-xs mt-1">{catErrors.pin}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      <Phone size={12} /> Phone <span className="text-red-600">*</span>
                    </label>
                    <input type="tel" name="phone" value={catCustomer.phone} onChange={handleCatCustomerChange}
                      placeholder="10-digit number" maxLength={10}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${catErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {catErrors.phone && <p className="text-red-500 text-xs mt-1">{catErrors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    <Mail size={12} /> Email <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <input type="email" name="email" value={catCustomer.email} onChange={handleCatCustomerChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition ${catErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {catErrors.email && <p className="text-red-500 text-xs mt-1">{catErrors.email}</p>}
                </div>

                {/* Submit */}
                <button type="button" onClick={validateAndSendCatWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-black text-white text-base tracking-wide transition-all duration-200 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] shadow-lg mt-2"
                >
                  <MessageCircle size={22} strokeWidth={2.5} />
                  Send Order on WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 -mt-1">WhatsApp will open with your details pre-filled. Just press Send!</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
