# Deployment Guide

## Environment Variables Setup

To deploy this application successfully, you need to configure the following environment variables in your Vercel project:

### Required Environment Variables

1. **MONGODB_URI**
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/complaint-app`

2. **JWT_SECRET**
   - A secret key for JWT token signing
   - Example: `your-super-secret-jwt-key-here`

3. **EMAIL_USER**
   - Email address for sending notifications
   - Example: `your-email@gmail.com`

4. **EMAIL_PASS**
   - Email password or app password
   - Example: `your-app-password`

5. **EMAIL_HOST**
   - SMTP host
   - Example: `smtp.gmail.com`

6. **EMAIL_PORT**
   - SMTP port
   - Example: `587`

### How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project (complaint-feedback-app)
3. Navigate to Settings → Environment Variables
4. Add each variable with the appropriate values
5. Redeploy your application

### Local Development

For local development, create a `.env.local` file in the root directory with the same variables.

### Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique values for JWT_SECRET
- Consider using environment-specific MongoDB databases
- Use app passwords for email services when possible
