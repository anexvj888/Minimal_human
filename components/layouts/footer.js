import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t-4 border-red-600 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-9 w-7 overflow-hidden rounded-sm bg-gray-50 flex items-center justify-center p-0.5">
                <Image
                  src="/logo.png"
                  alt="Minimal Human Logo"
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
              <h3 className="font-black text-xl">MINIMAL<span className="text-red-600">.</span>HUMAN</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed font-medium">
              Premium essential wear. Designed for timeless style, supreme comfort, and uncompromising quality.
            </p>
            <p className="text-red-600 font-black text-sm italic tracking-wide">
              ★ You are now part of Minimalism ★
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-red-600">Quick Links</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors font-semibold">
                Home
              </Link>
              <Link href="/catalog" className="text-gray-700 hover:text-red-600 transition-colors font-semibold">
                Catalog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors font-semibold">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors font-semibold">
                Contact
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-red-600">Support</h4>
            <p className="text-gray-700 text-sm mb-4 font-medium">
              Questions? We&apos;re here to help.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                <Mail size={16} className="text-red-600" />
                <a href="mailto:minimalhumanbeing0@gmail.com" className="font-medium">minimalhumanbeing0@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                <MessageCircle size={16} className="text-red-600" />
                <a href="https://wa.me/919037498360" target="_blank" rel="noopener noreferrer" className="font-medium">
                  +91 9037 498360
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-red-600">Newsletter</h4>
            <p className="text-gray-700 text-sm mb-4 font-medium">
              Subscribe for style tips & exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white text-black placeholder-gray-500 border-2 border-gray-300 focus:border-red-600 text-sm focus:outline-none transition-colors font-medium"
              />
              <button className="px-6 py-3 bg-red-600 text-white font-black text-sm hover:bg-red-700 transition-colors uppercase tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-red-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm font-semibold">
              © 2024 Minimal Human. All rights reserved.
            </p>
            <div className="flex gap-8 mt-4 md:mt-0 text-sm text-gray-700 font-semibold">
              <a href="#" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Returns
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
