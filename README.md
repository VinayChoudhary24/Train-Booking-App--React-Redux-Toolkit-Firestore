# React + TypeScript + Vite

# 🚂 Train Booking App

## 🚀 Live Deployment
**[View Live App](https://defibooking.vercel.app/)**

---

## 📖 Overview

A modern featured train booking application built with React, TypeScript, and Vite. The app provides a seamless experience for users to search trains, manage bookings, and handle authentication with real-time data management.

## ✨ Features

### 🔐 User Management
- **User Registration & Login** - Secure authentication system
- **Guest Access** - Search trains without login required
- **User Bookings** - Personalized booking management

### 🔍 Train Search & Booking
- **Station Search** - Find trains between different stations
- **Advanced Filtering** - Filter trains based on various criteria like DATE, TRAVEL CLASS Etc.
- **Multiple Passengers** - Add multiple passengers in a single booking
- **Booking History** - Review and manage past bookings

### 🎯 User Experience
- **Responsive Design** - Optimized for all device sizes
- **Real-time Updates** - Live train information and booking status
- **Performance Optimized** - Minimized re-renders and optimized components

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** - Efficient state management
- **Redux Logger** - Development debugging middleware
- **Redux Loader** - Loading state management middleware

### Backend & Database
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication service

### Styling
- **CSS Modules** - Scoped styling with `.module.css` approach
- **Modular Architecture** - Component-based styling

## 🏗️ Architecture & Performance

### State Management Structure
```
Redux Store
├── User Authentication Slice
├── Loader State Slice
├── Train Filter & Search Slice
├── Middlewares
└── Booking Management Slice
```

### Performance Optimizations
- **React.memo** - Prevents unnecessary child component re-renders
- **useMemo** - Memoizes expensive calculations
- **useCallback** - Optimizes function references
- **Custom Hooks** - Reusable logic abstraction

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account and project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/train-booking-app.git
   cd train-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── config/              # App related configuration
├── layouts/             # Main App Layout 
├── pages/               # Page components
├── store/               # Redux store configuration
├── styles/              # CSS Module files
├── utils/               # Utility functions
├── AppRoutes.tsx        # All the Routes Logic
├── AuthInitializer.tsx  # Firebase Auth Observable
└── App.tsx              # Main application component
```

## 🔧 Key Features Implementation

### Authentication Flow
- Firebase Authentication integration
- Protected routes for authenticated users
- Persistent login state with Redux

### Search & Filter System
- Real-time train search functionality
- Advanced filtering options

### Booking Management
- Multi-passenger booking system
- Booking history with detailed information
- Real-time booking status updates

### Performance Features
- Memoized components to prevent unnecessary re-renders
- Optimized re-rendering with useCallback and useMemo
- Efficient state updates with Redux Toolkit

## 🧪 Development Tools

- **Redux DevTools** - State debugging
- **TypeScript** - Type checking and IntelliSense
- **Vite HMR** - Hot module replacement for fast development
- **ESLint & Prettier** - Code formatting and linting

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Cross-browser compatibility

## 👨‍💻 Author

**VINAY CHOUDHARY**
- GitHub: https://github.com/VinayChoudhary24
- LinkedIn: https://www.linkedin.com/in/vinay-choudhary-9661121a1

---

⭐ Star this repo if you found it helpful!
