# NextAuth - Authentication System

A production-ready authentication system built with Next.js 16, featuring complete user registration, login, email verification, and password reset functionality.

## 📋 Project Description

NextAuth is a comprehensive authentication solution designed for modern web applications. It provides a secure, scalable, and user-friendly authentication system with full validation, email notifications, and protected routes. The system follows best practices for security, including password hashing with bcryptjs, JWT-based session management, and email verification tokens.

This authentication system is designed to be easily integrated into any Next.js application. It uses a modular architecture with separate API routes for each authentication function, making it easy to customize and extend. The frontend is built with React Hook Form for form handling and Zod for schema validation, ensuring type safety and robust error handling throughout the application.

## 🎬 Video Demo

Watch the complete project demo: **[NextAuth - Authentication System](https://youtu.be/PURGK4PSUHE)**

## 🛠️ Tech Stack & Libraries

### Core Framework

- **Next.js 16** - React framework for production-grade applications
- **React 19** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better developer experience

### Authentication & Security

- **JSON Web Token (JWT)** - Secure token-based authentication
- **bcryptjs** - Password hashing for secure storage
- **Nodemailer** - Email sending capability

### Form Handling & Validation

- **React Hook Form** - Performant form handling with easy validation
- **Zod** - TypeScript-first schema validation library
- **@hookform/resolvers** - Integration between React Hook Form and Zod
- **zod-form-data** - FormData validation with Zod

### Database

- **Mongoose** - MongoDB object modeling for Node.js

### UI Components

- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library for React
- **Sonner** - Toast notifications for React

### HTTP Client

- **Axios** - Promise-based HTTP client for API requests

## ✨ Project Features

### User Authentication

- **User Registration** - Sign up with username, email, and password with real-time validation
- **User Login** - Secure login with email and password using JWT tokens
- **User Logout** - Session termination with token invalidation
- **Protected Routes** - Middleware to protect authenticated routes

### Email Verification

- **Email Verification** - Send verification links to user email addresses
- **Verification Status** - Track and display email verification status
- **Resend Verification** - Allow users to request new verification emails

### Password Management

- **Forgot Password** - Request password reset via email
- **Reset Password** - Secure password reset with token validation
- **Password Requirements** - Enforce strong password policies (uppercase, lowercase, number, special character)

### User Profile

- **Profile View** - Display user information and verification status
- **Profile Update** - View and manage user profile data

### Form Validation

- **Real-time Validation** - Instant feedback on form inputs
- **Custom Validation Rules** - Email format, password strength, username requirements
- **Error Messages** - Clear, user-friendly error messages
- **Password Confirmation** - Ensure password matching

## 📁 File Structure

```
Next-js-auth-sys/
├── public/                          # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── api/                    # API routes
│   │   │   └── users/
│   │   │       ├── forgot-password/       # Password reset endpoint
│   │   │       ├── login/                 # User login endpoint
│   │   │       ├── logout/                # User logout endpoint
│   │   │       ├── me/                    # Current user endpoint
│   │   │       ├── resend-verification/   # Resend verification endpoint
│   │   │       ├── reset-password/        # Reset password endpoint
│   │   │       ├── signup/                # User registration endpoint
│   │   │       ├── verify-email/          # Email verification endpoint
│   │   │       └── verify-reset-token/   # Verify reset token endpoint
│   │   ├── forgot-password/       # Forgot password page
│   │   ├── login/                 # Login page
│   │   ├── profile/              # User profile page
│   │   │   └── [id]/             # Dynamic profile route
│   │   ├── resend-verification/  # Resend verification page
│   │   ├── reset-password/      # Reset password page
│   │   ├── signup/               # Registration page
│   │   ├── verify-email/        # Email verification page
│   │   ├── verify-reset-token/  # Verify reset token page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── dbconfig/                 # Database configuration
│   │   └── dbconfig.ts           # MongoDB connection
│   ├── helpers/                  # Helper functions
│   │   └── getDataFromToken.ts   # JWT token extraction
│   ├── lib/                      # Libraries and utilities
│   │   └── validations/          # Validation schemas
│   │       └── auth.ts           # Zod validation schemas
│   ├── models/                   # Database models
│   │   └── userModel.js          # Mongoose user model
│   ├── utils/                    # Utility functions
│   │   └── email.js              # Email sending utilities
│   └── proxy.ts                  # API proxy configuration
├── .env.local                    # Environment variables (create this)
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js 18.x or higher
- MongoDB (local or Atlas cloud)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Next-js-auth-sys
```

2. Install dependencies:

```bash
npm install
```

3. Create the environment file:

```bash
# See .env.sample below for reference
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection String
# Local: mongodb://localhost:27017/your_database_name
# Atlas: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/your_database_name
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/auth

# JWT Secret Token (generate a secure random string)
TOKEN_SECRET=your_super_secret_token_here_min_32_characters

# Application Domain
DOMAIN=http://localhost:3000

# Gmail SMTP Configuration
# Use an App Password (not your regular Gmail password)
GMAIL_EMAIL=your_email@gmail.com
GMAIL_PASSWORD=your_16_character_app_password

# Base URL for email links
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email From Address (optional)
EMAIL_FROM=noreply@yourapp.com
```

### Generating a Secure Token Secret

You can generate a secure token secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Gmail App Password Setup

Since Google doesn't allow regular passwords for SMTP, you need an App Password:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Enable **2-Step Verification** (required)
3. Go to **App Passwords** (search in Google Account settings)
4. Create a new app password named "NextAuth"
5. Use the 16-character password in your `.env.local`

## 🔐 API Endpoints

| Endpoint                         | Method | Description                 |
| -------------------------------- | ------ | --------------------------- |
| `/api/users/signup`              | POST   | Register a new user         |
| `/api/users/login`               | POST   | Authenticate user           |
| `/api/users/logout`              | POST   | Logout user                 |
| `/api/users/me`                  | GET    | Get current user            |
| `/api/users/verify-email`        | POST   | Verify email address        |
| `/api/users/resend-verification` | POST   | Resend verification email   |
| `/api/users/forgot-password`     | POST   | Request password reset      |
| `/api/users/reset-password`      | POST   | Reset password              |
| `/api/users/verify-reset-token`  | POST   | Verify reset token validity |

## 🔒 Security Features

- Passwords are hashed using bcryptjs before storage
- JWT tokens are used for session management
- Email verification tokens expire after 1 hour
- Password reset tokens expire after 1 hour
- Strong password validation (minimum 6 characters with uppercase, lowercase, number, and special character)
- CORS protection on API routes

## 🚀 Deploy on Vercel

Deploy this project to Vercel for free:

### Option 1: Deploy via GitHub (Recommended)

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository
5. Add environment variables in **Settings** → **Environment Variables**
6. Click **"Deploy"**

### Environment Variables on Vercel

Add these in Vercel dashboard:

- `MONGO_URI` - MongoDB Atlas connection string
- `TOKEN_SECRET` - JWT secret
- `GMAIL_EMAIL` - Your Gmail address
- `GMAIL_PASSWORD` - Gmail App Password
- `NEXT_PUBLIC_BASE_URL` - Your Vercel domain
- `DOMAIN` - Your Vercel domain

For detailed deployment instructions, watch the video demo: **[NextAuth - Authentication System](https://youtu.be/PURGK4PSUHE)**

## 📄 License

This project is licensed under the MIT License.
