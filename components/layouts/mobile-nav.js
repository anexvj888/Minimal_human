'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Info, Phone } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/catalog', label: 'Catalog', icon: Grid3X3 },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-red-600 shadow-[0_-4px_24px_rgba(0,0,0,0.10)]">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 min-w-[64px] ${
                isActive ? 'text-red-600' : 'text-gray-400'
              }`}
            >
              {/* Active dot indicator at top */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-red-600 rounded-b-full" />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-semibold tracking-wide uppercase`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
