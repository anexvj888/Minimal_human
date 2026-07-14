'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';

export default function About() {
  const values = [
    {
      title: 'Quality',
      description: 'We use only the finest materials and craftsmanship in every piece.',
    },
    {
      title: 'Simplicity',
      description: 'Our designs are timeless, free from unnecessary complexity.',
    },
    {
      title: 'Sustainability',
      description: 'We care about our planet and produce responsibly.',
    },
    {
      title: 'Accessibility',
      description: 'Premium quality at fair prices for everyone.',
    },
  ];

  const timeline = [
    { year: '2020', event: 'Minimal Human Founded' },
    { year: '2021', event: 'Launched First Collection' },
    { year: '2022', event: 'Expanded to 10,000+ Customers' },
    { year: '2023', event: 'Opened Regional Offices' },
    { year: '2024', event: 'Global Recognition' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300">
              Building a brand that celebrates minimalism, quality, and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-black">Our Journey</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Minimal Human was founded with a simple belief: great clothes don&apos;t need to be
              complicated. In a world of excess, we create essentials that matter. Each piece in
              our collection is carefully designed to become a staple in your wardrobe—versatile,
              timeless, and undeniably comfortable.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that true style lies in simplicity. Our minimalist approach isn&apos;t about
              having less; it&apos;s about having better. We focus on quality over quantity, creating
              pieces that work as hard as you do and make you feel confident every single day.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, Minimal Human serves thousands of customers worldwide who share our vision:
              that premium fashion should be accessible, sustainable, and effortless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To create timeless, high-quality essential wear that empowers people to express
                their individuality with confidence. We believe fashion should be simple, accessible,
                and sustainable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-black mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a global brand recognized for our commitment to quality, simplicity, and
                sustainable practices. We aim to inspire a generation that values substance over
                trends.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-black text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-red-600 transition-colors"
              >
                <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-black text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Timeline
          </motion.h2>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-xl font-semibold text-black">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl md:text-5xl font-light mb-6"
          >
            "Less Noise.
            <span className="block text-red-600 font-semibold mt-3">More Style.</span>
          </motion.blockquote>
        </div>
      </section>

      <Footer />
    </>
  );
}
