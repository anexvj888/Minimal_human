'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X, Search, ShoppingCart, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAdmin(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* ─── TOP BAR (visible on all screen sizes) ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b-2 border-red-600 shadow-md'
            : 'bg-white border-b-2 border-red-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              <div className="relative h-9 w-7 md:h-11 md:w-9 overflow-hidden rounded-sm bg-gray-50 flex items-center justify-center p-0.5">
                <Image
                  src="/logo.png"
                  alt="Minimal Human Logo"
                  fill
                  className="object-contain mix-blend-multiply"
                  priority
                />
              </div>
              <span className="font-black text-lg md:text-2xl tracking-tighter text-black">
                MINIMAL<span className="text-red-600">.</span>HUMAN
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                    pathname === link.href ? 'text-red-600' : 'text-black hover:text-red-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Icons */}
            <div className="hidden md:flex items-center gap-6">
              <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded transition-colors">
                <ShoppingCart size={20} />
              </button>
              <Link href="/admin/login">
                <Button className="bg-red-600 text-white hover:bg-red-700 font-semibold rounded">
                  Admin
                </Button>
              </Link>
              {isAdmin && (
                <button onClick={handleLogout} className="p-2 hover:bg-red-50 hover:text-red-600 rounded transition-colors">
                  <LogOut size={20} />
                </button>
              )}
            </div>

            {/* Mobile Right — Cart + Drawer Toggle */}
            <div className="flex md:hidden items-center gap-1">
              <button className="p-2 hover:bg-red-50 rounded transition-colors text-black">
                <ShoppingCart size={20} />
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 hover:bg-red-50 rounded transition-colors text-black"
                aria-label="Open menu"
              >
                {/* Hamburger icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── SPACER ─── */}
      <div className="h-14 md:h-20" />

      {/* ─── MOBILE FULL-SCREEN DRAWER ─── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-[70] md:hidden flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b-2 border-red-600">
                <div className="flex items-center gap-2">
                  <div className="relative h-9 w-7 overflow-hidden rounded-sm bg-gray-50 flex items-center justify-center p-0.5">
                    <Image
                      src="/logo.png"
                      alt="Minimal Human Logo"
                      fill
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                  <span className="font-black text-lg tracking-tighter">
                    MINIMAL<span className="text-red-600">.</span>HUMAN
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between w-full py-4 text-base font-bold uppercase tracking-widest border-b border-gray-100 transition-colors ${
                        pathname === link.href
                          ? 'text-red-600'
                          : 'text-black hover:text-red-600'
                      }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="px-6 py-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/admin/login"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 w-full px-5 py-3 bg-red-600 text-white font-black uppercase tracking-widest text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Settings size={18} />
                  Admin Panel
                </Link>
                {isAdmin && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-5 py-3 border border-gray-200 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
