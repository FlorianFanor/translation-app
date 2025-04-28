# Translation App

A full-stack application to manage translations across multiple environments and languages.

Built with:
- Frontend: React (Vite, TypeScript, TailwindCSS)
- Backend: Node.js (Express, TypeScript)
- Database: PostgreSQL (with Prisma ORM)
- Authentication: JWT + Secure HttpOnly Cookies

---

## ✨ Features

- User Authentication (Register, Login, Logout)
- Protected Dashboard with:
  - Sidebar to select Environments
  - Language ComboBox to choose active language
  - Translations table with live edit functionality
- Secure backend with token validation
- Responsive design with TailwindCSS

---

## 📦 Installation

### 1. Clone the repository

git clone https://github.com/your-username/translation-app.git
cd translation-app

### 2. Install backend dependencies

cd backend
npm install
npm run dev

### 3. Install frontend dependencies

cd frontend/translation-app
npm install
npm run dev

### 4. change uour env file

DATABASE_URL="postgresql://user:password@localhost:5432/translationapp"
JWT_SECRET="your_secret_jwt_key"
FRONTEND_URL="http://localhost:5173"
