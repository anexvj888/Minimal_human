import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(30),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Product Schemas
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be greater than 0'),
  image: z.string().min(1, 'Image is required'),
  images: z.array(z.string()).default([]),
  category: z.enum(['Men', 'Women', 'New Arrivals']),
  gender: z.enum(['Men', 'Women', 'Unisex']),
  sizes: z.array(z.string()).min(1, 'Select at least one size'),
  stock: z.number().min(0, 'Stock must be 0 or greater'),
  featured: z.boolean().default(false),
});

export const updateProductSchema = productSchema.partial();

// Contact Schemas
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Newsletter Schemas
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});
