# ComplaintBox - Feedback Management System

A full-stack web application built with Next.js, TypeScript, and MongoDB that allows users to submit complaints and administrators to manage them efficiently.

## Features

### User Features
- **Complaint Submission**: Submit complaints with title, description, category, and priority
- **Form Validation**: Real-time validation using Zod schemas
- **Responsive Design**: Works seamlessly on mobile and desktop

### Admin Features
- **Complaint Management**: View, update, and delete complaints
- **Status Updates**: Change complaint status (Pending, In Progress, Resolved)
- **Filtering**: Filter complaints by status and priority
- **Email Notifications**: Receive notifications for new complaints and status updates

### Security Features
- **JWT Authentication**: Secure HTTP-only cookie-based authentication
- **Role-based Access**: Separate user and admin interfaces
- **Protected Routes**: Secure API endpoints

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **Email**: Nodemailer for notifications
- **Form Handling**: React Hook Form with Zod validation
- **Database**: MongoDB Atlas (cloud) or local MongoDB

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Email service** (Gmail, SendGrid, etc.)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/complaint-feedback-app.git
cd complaint-feedback-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/complaint-app
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail Example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
ADMIN_EMAIL=admin@yourcompany.com

# Optional: Node Environment
NODE_ENV=development
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `complaint-app`

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and add to `.env.local`

### 5. Email Configuration

#### Gmail Setup (Recommended for Development)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_PASS`

#### Alternative Email Services
- **SendGrid**: Use API key instead of password
- **Mailgun**: Use API key and domain
- **AWS SES**: Use AWS credentials

### 6. Run the Application

```bash
# Development mode
npm run dev
# or
yarn dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Usage Guide

### For Users

1. **Access the Application**
   - Navigate to `http://localhost:3000`
   - Click "Submit Complaint" button

2. **Authentication**
   - Sign up for a new account or log in
   - Choose "User" role during registration

3. **Submit a Complaint**
   - Fill in the complaint form:
     - **Title**: Brief description of the issue
     - **Description**: Detailed explanation
     - **Category**: Product, Service, or Support
     - **Priority**: Low, Medium, or High
   - Click "Submit Complaint"

### For Administrators

1. **Admin Access**
   - Register with "Admin" role or use demo account
   - Demo Admin: `admin@example.com` / `password123`

2. **Manage Complaints**
   - Access Admin Dashboard
   - View all submitted complaints
   - Update status using dropdown
   - Delete complaints if needed
   - Filter by status or priority

3. **Email Notifications**
   - Receive emails for new complaints
   - Get notifications for status updates

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Complaints
- `POST /api/complaints` - Create new complaint (User)
- `GET /api/complaints` - Get complaints (Admin: all, User: own)
- `PUT /api/complaints/[id]` - Update complaint
- `DELETE /api/complaints/[id]` - Delete complaint

## Email Configuration

### Gmail Setup (Detailed)

1. **Enable 2FA**
   ```bash
   # Go to Google Account → Security → 2-Step Verification
   # Enable if not already enabled
   ```

2. **Generate App Password**
   ```bash
   # Google Account → Security → App passwords
   # Select "Mail" and generate password
   # Copy the 16-character password
   ```

3. **Update Environment Variables**
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ADMIN_EMAIL=admin@yourcompany.com
   ```

### SendGrid Setup

1. **Create SendGrid Account**
2. **Generate API Key**
3. **Update Environment Variables**
   ```env
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   ```

## Deployment

### Vercel Deployment (Recommended)

1. **Prepare for Deployment**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure `NODE_ENV=production`

### Heroku Deployment

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Add Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set EMAIL_USER=your-email
   heroku config:set EMAIL_PASS=your-password
   heroku config:set ADMIN_EMAIL=admin@yourcompany.com
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## Project Structure

```
complaint-feedback-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── signup/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── me/route.ts
│   │   │   └── complaints/
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── complaints/
│   │   │   ├── submit/page.tsx
│   │   │   └── admin/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── AuthModal.tsx
│   │   ├── ComplaintForm.tsx
│   │   ├── ComplaintTable.tsx
│   │   ├── Navbar.tsx
│   │   └── ui/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── mailer.ts
│   └── models/
│       ├── User.ts
│       └── Complaint.ts
├── public/
├── package.json
└── README.md
```

## Security Considerations

### Production Security
- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Never commit secrets to Git
- **JWT Security**: Use strong, unique JWT secrets
- **Input Validation**: All inputs validated with Zod
- **Rate Limiting**: Consider implementing rate limiting
- **CORS**: Configure CORS for production domains

### Database Security
- ✅ **Connection String**: Use environment variables
- ✅ **User Permissions**: Minimal required permissions
- ✅ **Backup Strategy**: Regular database backups

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   mongod --version
   
   # Verify connection string
   echo $MONGODB_URI
   ```

2. **Email Not Sending**
   ```bash
   # Check email credentials
   # Verify app password for Gmail
   # Check firewall/network settings
   ```

3. **JWT Authentication Issues**
   ```bash
   # Verify JWT_SECRET is set
   # Check cookie settings
   # Clear browser cookies
   ```

4. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@yourcompany.com
- Documentation: [Wiki](https://github.com/yourusername/complaint-feedback-app/wiki)

##  Roadmap

- [ ] Real-time notifications using WebSockets
- [ ] File upload for complaint attachments
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Complaint templates
- [ ] SLA tracking and alerts

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
