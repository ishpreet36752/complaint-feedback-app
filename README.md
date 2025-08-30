# Complaint Feedback Application

## 🚀 Live Deployment

**This application is successfully deployed and accessible online at:**
**https://complaint-feedback-app.vercel.app**

## 📖 The Story Behind the App (Assignment Explanation)

This project represents a complete full-stack development journey, from backend architecture to frontend design and deployment. Here's my development story:

### 1. **Deployment First Approach**
The application is fully deployed and live on Vercel, demonstrating end-to-end development and production readiness. Users can immediately access and test all functionality without any local setup.

### 2. **Backend Development & CRUD Operations**
I personally developed the complete backend infrastructure, implementing essential CRUD (Create, Read, Update, Delete) operations:
- **User Management**: Secure authentication system with JWT tokens
- **Complaint System**: Full CRUD operations for complaint management
- **Role-Based Access**: Distinct functionalities for users and administrators
- **Database Integration**: MongoDB with Mongoose for data persistence
- **API Endpoints**: RESTful API design for all operations

### 3. **Email Integration with Gmail SMTP**
Implemented a robust email notification system using Gmail's SMTP service:
- **Automated Notifications**: Email confirmations for complaint submissions
- **Status Updates**: Real-time email notifications for complaint status changes
- **Professional Communication**: Branded email templates for user engagement
- **SMTP Configuration**: Secure email delivery using Gmail's SMTP servers

### 4. **Frontend with Shadcn UI & Deployment**
Crafted a modern, responsive user interface using Shadcn UI components:
- **Modern Design**: Clean, professional interface with travel-themed aesthetics
- **Responsive Layout**: Optimized for all devices and screen sizes
- **User Experience**: Intuitive navigation and smooth interactions
- **Production Deployment**: Successfully deployed to Vercel with full functionality

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer with Gmail SMTP
- **Validation**: Zod schema validation
- **Deployment**: Vercel
- **Styling**: Custom CSS with travel-themed design system

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Gmail account for email functionality

### 1. Clone the Repository
```bash
git clone https://github.com/ishpreet36752/complaint-feedback-app.git
cd complaint-feedback-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables Setup
Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/complaint-app"

# JWT Secret for Authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration (Gmail SMTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
```

**Important Notes:**
- **MONGODB_URI**: Get this from MongoDB Atlas dashboard
- **JWT_SECRET**: Generate a strong random string for security
- **EMAIL_PASS**: Use Gmail App Password (not your regular password) if 2FA is enabled

### 4. Run the Application Locally
```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`

## 🚀 How to Use the Application

### Demo Accounts
For quick testing, you can use these demo accounts:
- **Admin**: `admin@example.com` / `password123`
- **User**: `user@example.com` / `password123`

### User Flow
1. **Homepage**: Visit the application and see the welcoming interface
2. **Authentication**: Sign up for a new account or log in with existing credentials
3. **Submit Complaint**: Navigate to "Share Your Experience" to submit feedback
4. **Form Fields**: Fill in title, description, category (Product/Service/Support), and priority
5. **Submission**: Submit and receive email confirmation

### Admin Flow
1. **Admin Login**: Log in with admin credentials
2. **Dashboard Access**: Navigate to "Admin Dashboard"
3. **Manage Complaints**: View all submitted complaints in a table format
4. **Filter Options**: Filter by status (Pending/In Progress/Resolved) and priority
5. **Update Status**: Change complaint status using dropdown menus
6. **Delete Complaints**: Remove complaints if needed

## 📧 Email Functionality

The application includes a comprehensive email notification system:

### Configuration
- **SMTP Provider**: Gmail SMTP server
- **Security**: Uses App Passwords for enhanced security
- **Templates**: Professional email templates for notifications

### Email Features
- **Complaint Confirmation**: Users receive confirmation emails upon submission
- **Status Updates**: Real-time notifications when complaint status changes
- **Professional Branding**: Emails include Prime Vacations branding

### Gmail Setup Instructions
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use the App Password in your `EMAIL_PASS` environment variable

## 🗃️ MongoDB Setup

### MongoDB Atlas (Recommended)
1. **Create Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Set up a new cluster (free tier available)
3. **Database User**: Create a database user with read/write permissions
4. **Network Access**: Configure IP whitelist (0.0.0.0/0 for development)
5. **Connection String**: Copy the connection string to your `MONGODB_URI`

### Database Schema
The application uses two main collections:

**Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: "user" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

**Complaints Collection:**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: "Product" | "Service" | "Support",
  priority: "Low" | "Medium" | "High",
  status: "Pending" | "In Progress" | "Resolved",
  userId: ObjectId (reference to Users),
  dateSubmitted: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 📸 Screenshots

Here are screenshots showcasing the application's functionality:

### 1. Homepage - Welcome Interface
![Homepage](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/homepage.png?raw=true)

*The welcoming homepage featuring the Prime Vacations branding, call-to-action buttons, and user-friendly design.*

### 2. Login Modal with Demo Accounts
![Login Modal](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/login-modal.png?raw=true)

*Authentication modal showing demo account credentials and error handling for invalid login attempts.*

### 3. Complaint Submission Form
![Complaint Form](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/complaint-form.png?raw=true)

*The feedback submission form with travel-themed categories and priority selection.*

### 4. Success Message After Submission
![Success Message](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/success-message.png?raw=true)

*Confirmation dialog showing successful complaint submission with user feedback.*

### 5. Admin Dashboard
![Admin Dashboard](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/admin-dashboard.png?raw=true)

*Administrative interface for managing complaints with filtering options and status management.*

### 6. Backend - MongoDB Compass (Users Collection)
![MongoDB Users](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/mongodb-users.png?raw=true)

*Database view showing user records with hashed passwords and role assignments.*

### 7. Backend - MongoDB Compass (Complaints Collection)
![MongoDB Complaints](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/mongodb-complaints.png?raw=true)

*Database view showing complaint records with categories, priorities, and statuses.*

### 8. API Testing - Postman
![Postman API](https://github.com/ishpreet36752/complaint-feedback-app/blob/main/docs/postman-api.png?raw=true)

*API testing demonstration showing successful complaint creation with JSON request/response.*

## 🔧 How to Add Screenshots

To add these screenshots to your repository:

1. **Create a `docs` folder** in your project root
2. **Save the screenshots** with descriptive names:
   - `homepage.png`
   - `login-modal.png`
   - `complaint-form.png`
   - `success-message.png`
   - `admin-dashboard.png`
   - `mongodb-users.png`
   - `mongodb-complaints.png`
   - `postman-api.png`

3. **Upload to GitHub**: Push the `docs` folder to your repository
4. **Update URLs**: Replace the placeholder URLs in this README with the actual GitHub raw URLs

## 🎯 Key Features Demonstrated

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete for complaints
- ✅ **User Authentication**: Secure login/signup with JWT
- ✅ **Role-Based Access**: Different interfaces for users and admins
- ✅ **Email Integration**: Automated notifications via Gmail SMTP
- ✅ **Database Management**: MongoDB with proper schema design
- ✅ **Modern UI/UX**: Travel-themed design with Shadcn UI
- ✅ **Production Deployment**: Live application on Vercel
- ✅ **API Testing**: Demonstrated with Postman

## 📞 Support

For any questions or issues, please refer to the deployment at:
**https://complaint-feedback-app.vercel.app**

---

*This project demonstrates comprehensive full-stack development skills, from backend API development to frontend design and production deployment.*
