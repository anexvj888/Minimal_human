# Deployment Guide - Minimal Human

Complete step-by-step guide to deploy Minimal Human to production.

## Prerequisites

- GitHub account with repository access
- Vercel account (vercel.com)
- MongoDB Atlas account (mongodb.com)
- Optional: Cloudinary account for image uploads

## Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Cluster**
   - Sign in to MongoDB Atlas
   - Create a new project named "Minimal Human"
   - Create a M0 (free) cluster
   - Enable public IP access (or restrict to your IPs)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Choose "Node.js" and copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Replace `<myFirstDatabase>` with `minimal-human`

3. **Create Database User**
   - Username: minimaladmin
   - Password: (strong, 32+ characters)
   - Database: admin
   - Permissions: readWriteAnyDatabase

## Step 2: Prepare Your Code

1. **Initialize Git Repository**
```bash
cd minimal-human
git init
git add .
git commit -m "Initial commit: Minimal Human e-commerce platform"
```

2. **Push to GitHub**
```bash
git branch -M main
git remote add origin https://github.com/yourusername/minimal-human.git
git push -u origin main
```

## Step 3: Vercel Deployment

1. **Connect GitHub to Vercel**
   - Go to vercel.com/dashboard
   - Click "Add New..." > "Project"
   - Select "Import Git Repository"
   - Connect your GitHub account
   - Select the `minimal-human` repository

2. **Configure Environment Variables**

   In Vercel dashboard, go to Settings > Environment Variables and add:

   ```
   MONGODB_URI = mongodb+srv://minimaladmin:password@cluster0.mongodb.net/minimal-human?retryWrites=true&w=majority
   JWT_SECRET = your-random-32-character-secret-key
   NODE_ENV = production
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloudinary-name (optional)
   CLOUDINARY_API_KEY = your-cloudinary-key (optional)
   CLOUDINARY_API_SECRET = your-cloudinary-secret (optional)
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Your app is now live!

## Step 4: Database Setup

1. **Create Admin User**

   Connect to MongoDB Atlas and run:
   ```javascript
   use minimal-human;
   
   db.users.insertOne({
     username: "admin",
     email: "admin@minimalhuman.com",
     password: "$2a$10$...", // Use bcrypt hashed password
     role: "admin",
     isActive: true,
     createdAt: new Date(),
     updatedAt: new Date()
   });
   ```

2. **Add Sample Products** (optional)
   ```javascript
   db.products.insertMany([
     {
       name: "Classic White T-Shirt",
       slug: "classic-white-tshirt",
       description: "Premium quality white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
       price: 49.99,
       image: "https://via.placeholder.com/400x400?text=White+T-Shirt",
       category: "Men",
       gender: "Men",
       sizes: ["XS", "S", "M", "L", "XL", "XXL"],
       stock: 50,
       rating: 4.5,
       featured: true,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     // Add more products...
   ]);
   ```

## Step 5: Post-Deployment

1. **Verify Deployment**
   - Visit your Vercel URL
   - Test home page loads
   - Test catalog page loads products
   - Test admin login at /admin/login

2. **Custom Domain** (optional)
   - Go to Vercel > Project Settings > Domains
   - Add your custom domain
   - Configure DNS records as shown

3. **SSL Certificate**
   - Automatically issued by Vercel
   - No additional configuration needed

## Step 6: Monitoring & Maintenance

1. **Set Up Alerts**
   - Vercel: Settings > Analytics to monitor performance
   - MongoDB: Set up backup and replication

2. **Regular Backups**
   - MongoDB Atlas: Enable automatic backups
   - GitHub: Regular commits for code backup

3. **Monitor Performance**
   - Use Vercel Analytics dashboard
   - Check Core Web Vitals regularly
   - Monitor database performance

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify MongoDB URI is accessible
- Check Node version compatibility (18+)

### Connection Refused Error
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

### Admin Login Not Working
- Verify admin user exists in database
- Check JWT_SECRET is set in environment
- Review auth API response in browser console

### Images Not Loading
- Update image URLs in products (use Cloudinary or CDN)
- Check CORS settings if using external CDN

## Performance Optimization

1. **Image Optimization**
   - Use Cloudinary for automatic optimization
   - Serve WebP format when possible
   - Lazy load images

2. **Caching**
   - Enable Next.js caching
   - Set appropriate cache headers
   - Use SWR for client-side caching

3. **Database**
   - Create indexes on frequently queried fields
   - Use connection pooling
   - Monitor slow queries

## Security Checklist

- [ ] JWT_SECRET is strong (32+ chars, random)
- [ ] MongoDB user has minimal required permissions
- [ ] Environment variables are not in Git
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Admin routes are protected
- [ ] Input validation is in place
- [ ] CORS is properly configured
- [ ] Rate limiting is considered

## Rollback Procedure

If deployment causes issues:

1. **Revert to Previous Version**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Vercel Automatic Rollback**
   - Go to Vercel Dashboard > Deployments
   - Click on previous deployment
   - Click "Promote to Production"

## Getting Help

- Vercel Docs: vercel.com/docs
- Next.js Docs: nextjs.org/docs
- MongoDB Docs: mongodb.com/docs
- Support: minimalhumanbeing0@gmail.com

## Next Steps

After deployment, consider:

1. Add Stripe for payments
2. Implement shopping cart
3. Add order management
4. Set up email notifications
5. Add user accounts system
6. Implement analytics
7. Add product reviews
8. Set up CDN for images

---

**Happy Deploying! 🚀**
