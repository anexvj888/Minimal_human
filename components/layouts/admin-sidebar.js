'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Settings, X, LayoutGrid } from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      href: '/admin/products',
      icon: Package,
      label: 'Products',
    },
    {
      href: '/admin/featured-categories',
      icon: LayoutGrid,
      label: 'Featured Categories',
    },
    {
      href: '/admin/settings',
      icon: Settings,
      label: 'Settings',
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:relative w-64 h-screen bg-black text-white flex flex-col z-40 transition-transform duration-300 ${
          !isOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        }`}
        initial={false}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-7 overflow-hidden rounded-sm bg-white flex items-center justify-center p-0.5">
              <Image
                src="/logo.png"
                alt="Minimal Human Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold">Minimal Admin</h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.button
                  onClick={onClose}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-900'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Minimal Human v1.0
          </p>
        </div>
      </motion.aside>
    </>
  );
}
