# Minimal Human - E-Commerce Platform

A production-ready, luxury minimalist clothing e-commerce platform built with Next.js 16, React 19, MongoDB, and Tailwind CSS.

## 🎯 Project Overview

**Minimal Human** is a premium fashion brand website featuring:
- Complete product catalog with filtering and search
- Responsive mobile-first design
- Admin dashboard with CRUD product management
- JWT-based authentication
- Secure API routes
- Real-time product updates
- Beautiful animations with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19** (Latest)
- **JavaScript** (No TypeScript)
- **Tailwind CSS** (Styling)
- **shadcn/ui** (Components)
- **Framer Motion** (Animations)
- **React Hook Form** (Forms)
- **Zod** (Validation)
- **SWR** (Data fetching)
- **Lucide Icons** (Icons)

### Backend
- **Next.js Server Actions** (API)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)

### Cloud Storage
- **Cloudinary** (Image uploads - optional integration)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- MongoDB Atlas or local MongoDB instance
- Optional: Cloudinary account for image uploads

### Installation

1. **Clone/Setup the project**
```bash
cd minimal-human
pnpm install
```

2. **Configure Environment Variables**

Create `.env.local` with:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/minimal-human?retryWrites=true&w=majority

# Authentication  
JWT_SECRET=your-secret-key-min-32-chars

# Environment
NODE_ENV=development

# Optional: Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

3. **Start Development Server**
```bash
pnpm dev
```

Visit `http://localhost:3000` to see your app!

## 📁 Project Structure

```
minimal-human/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── products/       # Product CRUD endpoints
│   │   └── ...
│   ├── admin/              # Admin dashboard
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── settings/
│   │   └── login/
│   ├── catalog/            # Product catalog page
│   ├── product/            # Product detail pages
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── page.js             # Home page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── card.js
│   │   └── ...
│   ├── layouts/            # Layout components
│   │   ├── navbar.js
│   │   ├── footer.js
│   │   └── admin-sidebar.js
│   └── sections/           # Page sections
│       ├── product-card.js
│       ├── product-form.js
│       └── ...
├── lib/
│   ├── db/                 # Database connection & models
│   │   ├── connection.js
│   │   └── models.js
│   ├── auth/               # Authentication utilities
│   │   └── auth.js
│   ├── validation/         # Zod schemas
│   │   └── schemas.js
│   └── utils/              # Helper utilities
├── middleware.js           # Route middleware
├── .env.example            # Environment template
└── package.json
```

## 🔑 Key Features

### 1. **Home Page**
- Luxury hero section with animations
- Featured categories showcase
- Recommended products section
- Brand story and philosophy
- FAQ accordion
- Newsletter signup
- Premium footer

### 2. **Product Catalog**
- Grid/list views
- Search functionality
- Category filtering
- Price and rating sorting
- Pagination (12 products per page)
- Responsive design

### 3. **Product Details**
- High-quality image gallery
- Size selection
- Quantity selector
- Related products
- Product ratings
- Stock status

### 4. **Admin Dashboard**
- Stats dashboard
- Product management (CRUD)
- Search and filter products
- Bulk actions
- Settings configuration

### 5. **Authentication**
- JWT-based auth
- bcrypt password hashing
- Role-based access (user/admin)
- Secure cookies
- Protected routes

### 6. **Database Models**
```javascript
// User
{ username, email, password, role, isActive, timestamps }

// Product
{ name, slug, description, price, image, category, gender, sizes, stock, rating, featured, reviews, timestamps }

// Category
{ name, slug, description, image, timestamps }

// Order (future-ready)
{ orderNumber, userId, items, total, status, shippingAddress, timestamps }
```

## 🔐 API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - List all products (with pagination)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

## 👥 User Roles

### Admin
- Access: `/admin/dashboard`, `/admin/products`, `/admin/settings`
- Permissions: Full CRUD on products, view analytics

### Customer
- Access: Home, catalog, product details, about, contact
- Permissions: Browse products, view details

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Accent**: Deep Red (#B71C1C)
- **Background**: White (#FFFFFF)
- **Text**: Black (#000000) & Dark Gray

### Typography
- **Headings**: Inter (Bold, Semibold)
- **Body**: Inter (Regular, Medium)
- **Sizes**: Responsive with Tailwind

### Spacing
- Uses Tailwind spacing scale (4px base)
- Consistent 24px section padding
- 16px component padding

### Animations
- Fade, slide, scale with Framer Motion
- Smooth transitions (200ms)
- Hover states on interactive elements

## 🔒 Security

- ✅ JWT authentication with secure cookies
- ✅ bcrypt password hashing
- ✅ Protected admin routes with middleware
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Mongoose)
- ✅ CORS configuration ready
- ✅ Environment variable separation

## 📊 Performance

- ✅ Image optimization ready (Cloudinary)
- ✅ Lazy loading for images
- ✅ Code splitting with dynamic imports
- ✅ Server components for data fetching
- ✅ Skeletal loading states
- ✅ SEO optimized metadata

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads with hero section
- [ ] Navigation works across all pages
- [ ] Catalog filters and search work
- [ ] Product details page displays correctly
- [ ] Admin login page works
- [ ] Admin dashboard displays stats
- [ ] Add product form validates inputs
- [ ] Edit product updates correctly
- [ ] Delete product removes from DB
- [ ] Responsive design on mobile (375px)
- [ ] Responsive design on tablet (768px)
- [ ] Responsive design on desktop (1920px)

## 🚢 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Connect GitHub repo to Vercel
- Add environment variables in Vercel dashboard
- Deploy!

### Environment Variables for Production
```env
MONGODB_URI=production-mongodb-uri
JWT_SECRET=production-secret-key-32-chars-min
NODE_ENV=production
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary-name
CLOUDINARY_API_KEY=cloudinary-key
CLOUDINARY_API_SECRET=cloudinary-secret
```

## 🔗 Admin Credentials

For development, create an admin user in MongoDB:
```javascript
db.users.insertOne({
  username: "admin",
  email: "admin@minimalhuman.com",
  password: "hashed_password_from_bcrypt",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Default login path: `/admin/login`

## 🛣️ Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] User accounts and profiles
- [ ] Order history and tracking
- [ ] Wishlist feature
- [ ] Product reviews and ratings system
- [ ] Email notifications
- [ ] Cloudinary image upload integration
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Multi-currency support

## 📝 Notes

- Uses Turbopack (Next.js 16 default) for faster builds
- React 19 latest features available
- Fully responsive (mobile-first approach)
- No TypeScript (pure JavaScript)
- Development environment configured for rapid development

## 🤝 Support

For issues or questions:
- Email: minimalhumanbeing0@gmail.com
- WhatsApp: +91 9037 498360

## 📄 License

This project is built for educational and commercial purposes.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
