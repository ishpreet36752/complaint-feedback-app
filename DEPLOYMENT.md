# Deployment Guide - ComplaintBox

This guide covers deploying the ComplaintBox application to various platforms.

## 🚀Quick Deploy Options

### 1. Vercel (Recommended - Free Tier)

**Step 1: Prepare Your Repository**
```bash
# Ensure your code is in a GitHub repository
git add .
git commit -m "Initial commit"
git push origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   ```
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@yourcompany.com
   NODE_ENV=production
   ```
6. Click "Deploy"

**Step 3: Get Your Live URL**
- Vercel will provide: `https://your-app.vercel.app`
- Add this to your README.md

### 2. Netlify (Alternative - Free Tier)

**Step 1: Build Configuration**
Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Step 2: Deploy**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

### 3. Railway (Full-Stack - Paid)

**Step 1: Prepare for Railway**
```bash
# Add start script to package.json
{
  "scripts": {
    "start": "next start",
    "build": "next build"
  }
}
```

**Step 2: Deploy**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

**Step 1: Create Atlas Account**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new cluster (M0 Free tier)

**Step 2: Configure Database**
1. Create database: `complaint-app`
2. Create collections: `users`, `complaints`
3. Get connection string

**Step 3: Security**
1. Create database user
2. Set IP whitelist (0.0.0.0/0 for production)
3. Copy connection string to environment variables

### Local MongoDB (Development Only)
```bash
# Install MongoDB
brew install mongodb-community  # macOS
sudo apt install mongodb        # Ubuntu

# Start MongoDB
mongod

# Create database
mongo
use complaint-app
```

## 📧 Email Service Setup

### Gmail (Development/Testing)

**Step 1: Enable 2FA**
1. Go to Google Account settings
2. Security → 2-Step Verification → Enable

**Step 2: Generate App Password**
1. Security → App passwords
2. Select "Mail"
3. Generate 16-character password
4. Use in `EMAIL_PASS`

### SendGrid (Production Recommended)

**Step 1: Create Account**
1. Go to [sendgrid.com](https://sendgrid.com)
2. Create free account (100 emails/day)

**Step 2: Configure**
1. Create API key
2. Verify sender email
3. Update environment variables:
   ```
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   ```

### Mailgun (Alternative)

**Step 1: Setup**
1. Create account at [mailgun.com](https://mailgun.com)
2. Add domain
3. Get API key

**Step 2: Configure**
```
EMAIL_USER=postmaster@yourdomain.com
EMAIL_PASS=your-mailgun-api-key
```

## 🔒 Security Configuration

### Environment Variables Checklist

**Required for Production:**
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/complaint-app

# Authentication
JWT_SECRET=your-very-long-random-secret-key-here

# Email
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-app-password-or-api-key
ADMIN_EMAIL=admin@yourcompany.com

# Environment
NODE_ENV=production
```

### Security Best Practices

1. **JWT Secret**
   ```bash
   # Generate strong secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **HTTPS Only**
   - Vercel/Netlify provide HTTPS automatically
   - For custom domains, ensure SSL certificate

3. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use platform-specific environment variable management

4. **Database Security**
   - Use strong passwords
   - Limit IP access
   - Regular backups

## 📱 Domain Configuration

### Custom Domain Setup

**Vercel:**
1. Go to project settings
2. Domains → Add domain
3. Configure DNS records
4. Wait for SSL certificate

**Netlify:**
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS
4. SSL certificate auto-provisioned

## 🔍 Monitoring & Analytics

### Vercel Analytics
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to _app.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Error Monitoring
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in sentry.client.config.js
export default {
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
}
```

## 🚀 Performance Optimization

### Build Optimization
```bash
# Analyze bundle
npm run build
npm run analyze

# Optimize images
# Use Next.js Image component
# Enable compression
```

### Database Optimization
```bash
# Add indexes
db.complaints.createIndex({ "userId": 1 })
db.complaints.createIndex({ "status": 1 })
db.complaints.createIndex({ "dateSubmitted": -1 })
```

## 📊 Health Checks

### Add Health Check Endpoint
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
```

### Monitor Endpoints
- `/api/health` - Application health
- `/api/complaints` - Database connectivity
- `/api/auth/me` - Authentication status

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check build locally
   npm run build
   
   # Check for TypeScript errors
   npx tsc --noEmit
   ```

2. **Environment Variables**
   ```bash
   # Verify all required vars are set
   echo $MONGODB_URI
   echo $JWT_SECRET
   echo $EMAIL_USER
   ```

3. **Database Connection**
   ```bash
   # Test connection string
   mongosh "your-connection-string"
   ```

4. **Email Issues**
   ```bash
   # Check email credentials
   # Verify app passwords
   # Check rate limits
   ```

## 📈 Scaling Considerations

### Performance
- Use CDN for static assets
- Implement caching strategies
- Database connection pooling
- Image optimization

### Cost Optimization
- Use free tiers initially
- Monitor usage
- Implement rate limiting
- Optimize database queries

---

**Ready to deploy? Choose your platform and follow the steps above! 🚀**
