'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validation/schemas';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Contact form submitted:', data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="py-10 md:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg">
              We&apos;d love to hear from you. Send us a message!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-black mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded text-green-600 text-sm"
                  >
                    Thank you! We&apos;ll get back to you soon.
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Full Name
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="John Doe"
                    error={errors.name?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email Address
                  </label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Subject
                  </label>
                  <Input
                    {...register('subject')}
                    placeholder="How can we help?"
                    error={errors.subject?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us more..."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-black mb-8">Contact Information</h2>
              </div>

              {/* Email */}
              <motion.div
                className="flex gap-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">Email</h3>
                  <a
                    href="mailto:minimalhumanbeing0@gmail.com"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    minimalhumanbeing0@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                className="flex gap-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/919037498360"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    +91 9037 498360
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex gap-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">Phone</h3>
                  <a
                    href="tel:+919037498360"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    +91 9037 498360
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="flex gap-4 pt-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">Location</h3>
                  <p className="text-gray-600">
                    Minimal Human Headquarters
                    <br />
                    Kerala, India
                  </p>
                </div>
              </motion.div>

              {/* Business Hours */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                <h3 className="text-lg font-semibold text-black mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>11:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
