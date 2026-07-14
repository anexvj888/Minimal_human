# Quick Start Guide - Minimal Human

Get Minimal Human up and running in 5 minutes!

## 1. Clone or Download

```bash
git clone <your-repo-url>
cd minimal-human
```

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Setup Environment Variables

Create `.env.local` in the root directory:

```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/minimal-human?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-min-32-chars-here

# Optional (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

**Where to get these?**

- **MONGODB_URI**: 
  - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Create a cluster (free M0 tier)
  - Get connection string from "Connect" button

- **JWT_SECRET**: 
  - Generate random string: `openssl rand -base64 32`
  - Or use any 32+ character random string

- **Cloudinary** (optional):
  - Sign up at [Cloudinary](https://cloudinary.com)
  - Get API credentials from dashboard

## 4. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the app!

## 5. First Time Setup

### Add Admin User

1. Connect to MongoDB Atlas
2. Go to Collections > users collection
3. Insert a document:

```javascript
{
  username: "admin",
  email: "admin@minimalhuman.com",
  password: "$2a$10$...", // Use online bcrypt tool or Node
  role: "admin",
  isActive: true,
  createdAt: ISODate(),
  updatedAt: ISODate()
}
```

**To generate bcrypt hash for password:**
```bash
node -e "console.log(require('bcryptjs').hashSync('password123', 10))"
```

### Add Sample Products

1. In MongoDB Collections, go to products
2. Insert sample products:

```javascript
{
  name: "Classic White T-Shirt",
  slug: "classic-white-tshirt",
  description: "Premium quality white t-shirt made from 100% organic cotton",
  price: 49.99,
  image: "https://via.placeholder.com/400?text=T-Shirt",
  category: "Men",
  gender: "Men",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  stock: 50,
  rating: 4.5,
  featured: true,
  createdAt: ISODate(),
  updatedAt: ISODate()
}
```

## 6. Access the App

### Customer Pages
- **Home**: http://localhost:3000
- **Catalog**: http://localhost:3000/catalog
- **About**: http://localhost:3000/about
- **Contact**: http://localhost:3000/contact

### Admin Area
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard (after login)
- **Products**: http://localhost:3000/admin/products (after login)
- **Settings**: http://localhost:3000/admin/settings (after login)

**Admin Login Credentials:**
```
Username: admin
Password: password123 (or whatever you set)
```

## Key Features to Try

### 1. Browse Products
- Go to `/catalog`
- Filter by category (Men, Women, New Arrivals)
- Sort by price, rating, or name
- Search for products

### 2. View Product Details
- Click any product to see details
- View size options
- Check stock status

### 3. Admin Panel
- Login with admin credentials
- View dashboard stats
- Add new products
- Edit existing products
- Delete products
- Update store settings

### 4. Responsive Design
- Resize browser to test mobile view
- Try mobile device emulation in DevTools

## Project Structure Overview

```
├── app/
│   ├── page.js              → Home page
│   ├── catalog/             → Product catalog
│   ├── product/[id]/        → Product details
│   ├── about/               → About page
│   ├── contact/             → Contact page
│   └── admin/               → Admin area
├── components/
│   ├── ui/                  → Reusable components
│   ├── layouts/             → Navbar, footer
│   └── sections/            → Product cards, forms
├── lib/
│   ├── db/                  → Database & models
│   ├── auth/                → Authentication
│   └── validation/          → Form validation
└── README.md                → Full documentation
```

## Common Tasks

### Add New Product (Via Admin)
1. Login at `/admin/login`
2. Go to `/admin/products`
3. Click "Add Product"
4. Fill in details
5. Click "Add Product"

### Update Product
1. Go to `/admin/products`
2. Find product
3. Click "Edit" (pencil icon)
4. Modify details
5. Click "Update Product"

### Delete Product
1. Go to `/admin/products`
2. Find product
3. Click "Delete" (trash icon)
4. Confirm deletion

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGODB_URI is correct
- Verify IP whitelist in MongoDB Atlas
- Check database user credentials
- Restart dev server

### "Admin login not working"
- Verify admin user exists in database
- Check password is correct
- Ensure JWT_SECRET is set

### "Products not loading"
- Check MongoDB connection
- Verify products exist in database
- Check browser console for errors

### "Styles not loading"
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `pnpm dev`

## Next Steps

1. **Customize Branding**
   - Update logo in navbar
   - Change colors in globals.css
   - Update brand text

2. **Add Products**
   - Use admin panel to add products
   - Or import via MongoDB directly

3. **Connect Payment**
   - Integrate Stripe for checkout

4. **Add More Features**
   - User accounts
   - Shopping cart
   - Order management
   - Reviews system

5. **Deploy**
   - See DEPLOYMENT.md for full instructions
   - Quick: Push to GitHub, connect to Vercel

## Useful Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Clean build cache
rm -rf .next node_modules
pnpm install
```

## Getting Help

- **Docs**: See `README.md` for full documentation
- **Deployment**: See `DEPLOYMENT.md` for deployment guide
- **Email**: minimalhumanbeing0@gmail.com
- **WhatsApp**: +91 9037 498360

## What's Next?

✅ Development environment ready
✅ Database connected
✅ Admin panel working
✅ Products displaying

Now you can:
- Add your products
- Customize the design
- Deploy to production
- Add payment integration
- Launch to customers!

---

**Happy Building! 🚀**
