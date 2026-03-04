![React](https://img.shields.io/badge/React-19.2+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3+-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2+-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

# 🎨 Nari-Astra Frontend

> Modern React SPA for women's empowerment e-commerce

A modern React application built with Vite and Tailwind CSS for the Nari-Astra e-commerce platform. This frontend provides a responsive and engaging user interface for browsing products, managing shopping carts, user authentication, and order management.

---

## 📋 Overview

The frontend is a SPA (Single Page Application) built with React 19, featuring:
- 🔐 User authentication with JWT and Google OAuth
- 🛍️ Product browsing and search
- 🛒 Shopping cart management
- 👤 User profile management
- 📦 Order history
- 📱 Responsive design with Tailwind CSS
- ✨ Smooth animations with GSAP
- 🎛️ State management with Zustand

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2+ | UI library |
| **Vite** | 7.3+ | Build tool |
| **Tailwind CSS** | 4.2+ | Styling |
| **Zustand** | 5.0+ | State management |
| **React Router** | 7.13+ | Client-side routing |
| **Axios** | 1.13+ | HTTP client |
| **GSAP** | 3.14+ | Animations |
| **Lucide React** | 0.575+ | Icons |

---

## 📦 Installation

### Prerequisites ⚙️

| Requirement | Version |
|-------------|---------|
| **Node.js** | v16 or higher |
| **npm or yarn** | latest |
| **Backend API** | running on http://localhost:5000 |

### Setup Steps 🚀

```bash
# 1️⃣ Navigate to frontend
cd frontend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
EOF

# 4️⃣ Start development server
npm run dev
```

**✅ Application ready at:** `http://localhost:5173`

---

## 📁 Project Structure

```
frontend/
├── 🖼️  public/                  # Static assets
│   ├── background/              # Background images
│   ├── empowerment/             # Empowerment assets
│   ├── fonts/                   # Custom fonts
│   └── spray/                   # Spray/design assets
├── 💻 src/
│   ├── 🌐 api/                  # API service layer
│   │   ├── axios.config.js      # Axios setup
│   │   ├── product.service.js   # Product API
│   │   └── user.service.js      # User API
│   ├── 📦 assets/               # Images & media
│   ├── 🧩 components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.jsx       # Navigation
│   │   │   ├── Footer.jsx       # Footer
│   │   │   ├── Loader.jsx       # Loading animation
│   │   │   └── ScrollToTop.jsx  # Scroll button
│   │   ├── sections/            # Page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── FeatureShowcase.jsx
│   │   │   └── Testimonials.jsx
│   │   └── ui/                  # UI components
│   │       └── Button.jsx
│   ├── 📄 pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   ├── 🎛️  store/               # State management
│   │   ├── useAuthStore.js
│   │   ├── useCartStore.js
│   │   └── useProductStore.js
│   ├── App.jsx                  # Main component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── 🔧 vite.config.js            # Vite config
├── eslint.config.js             # ESLint config
├── package.json
└── README.md
```

---

## Key Components

### Layout Components

#### Navbar
Main navigation component with:
- Logo and branding
- Navigation links
- Shopping cart icon with item count
- User menu (logged in / login button)
- Mobile responsive menu

#### Footer
Footer component with:
- Company information
- Quick links
- Contact information
- Social media links

#### Loader
Full-screen loading animation displayed on app startup.

#### ScrollToTop
Smooth scroll-to-top button that appears when scrolling down.

### Section Components

#### Hero
Large hero section with:
- Call-to-action buttons
- Background imagery
- Mission statement

#### FeatureShowcase
Displays key features:
- Feature cards with icons
- Feature descriptions
- GSAP animations

#### SpiritSection
Highlights company values:
- Mission statement
- Core values
- Empowerment message

#### Testimonials
User testimonials carousel with:
- User reviews
- Ratings
- Smooth scrolling

#### ValuesAndFAQ
Company values and frequently asked questions:
- Value proposition
- FAQ accordion
- Expandable items

### Page Components

#### Home
Landing page featuring:
- Hero section
- Feature showcase
- Testimonials
- Call-to-action

#### Shop
Product listing page with:
- Product grid
- Filtering options
- Search functionality
- Product cards with add-to-cart

#### Cart
Shopping cart view showing:
- Cart items
- Item quantity controls
- Remove item buttons
- Order summary
- Checkout button

#### Features
Detailed features page describing:
- Product capabilities
- Security features
- User benefits

#### Story
Company story page with:
- Mission statement
- Company history
- Values and vision

#### Safety
Safety information page:
- Security practices
- Data privacy
- Trust information

#### Contact
Contact form with:
- Contact information
- Message form
- Email integration

#### Login
User login page with:
- Email and password form
- Google OAuth button
- Register link
- Form validation

#### Register
User registration page with:
- Email, password, name fields
- Password confirmation
- Terms agreement
- Form validation

#### Profile
User profile page showing:
- User information
- Profile editing
- Address management
- Order history
- Logout button

## State Management (Zustand)

### useAuthStore
Authentication state management:
```javascript
import { useAuthStore } from './store/useAuthStore';

const { 
  user, 
  isLoggedIn, 
  token, 
  login, 
  register, 
  logout, 
  setUser 
} = useAuthStore();
```

### useCartStore
Shopping cart state:
```javascript
import { useCartStore } from './store/useCartStore';

const { 
  cart, 
  total, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} = useCartStore();
```

### useProductStore
Product state:
```javascript
import { useProductStore } from './store/useProductStore';

const { 
  products, 
  loading, 
  fetchProducts, 
  getProductById 
} = useProductStore();
```

## API Integration

### Axios Configuration
Centralized API configuration in `api/axios.config.js`:
- Base URL from environment variables
- Default headers
- JWT token injection
- Error handling

### Product Service (`product.service.js`)
```javascript
// Get all products
getAllProducts(page, limit)

// Get product by ID
getProductById(id)

// Search products
searchProducts(query)
```

### User Service (`user.service.js`)
```javascript
// Register new user
register(email, password, fullName)

// Login user
login(email, password)

// Google OAuth
loginWithGoogle(token)

// Get profile
getProfile()

// Update profile
updateProfile(data)

// Logout
logout()
```

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Dark theme configuration
- Custom color palette
- Responsive design

### Global Styles (`index.css`)
- Font definitions
- Theme variables
- Global animations
- Responsive utilities

### Component Styling
Each component uses Tailwind classes:
```jsx
<div className="flex items-center justify-between p-4 bg-primary rounded-lg">
  {/* Component content */}
</div>
```

## Animations

### GSAP Integration
Smooth animations for:
- Page transitions
- Component entrance animations
- Scroll triggers
- Interactive elements

Example animation:
```javascript
import gsap from 'gsap';

const animateElement = () => {
  gsap.to('.element', {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: 'power3.out'
  });
};
```

## Authentication Flow

### User Registration
1. User fills registration form
2. Frontend validates input
3. Sends request to `/api/users/register`
4. Backend creates user and returns JWT
5. Store token in Zustand store
6. Redirect to dashboard

### User Login
1. User enters credentials
2. Frontend submits to `/api/users/login`
3. Backend validates and returns JWT
4. Store token in localStorage/Zustand
5. Include token in all API requests
6. Redirect to dashboard

### Google OAuth
1. User clicks "Login with Google"
2. Google OAuth flow
3. Receive ID token
4. Send to `/api/users/google`
5. Backend verifies and returns JWT
6. Store and redirect

### Protected Routes
```jsx
<Route 
  path="/profile" 
  element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
/>
```

## 📜 Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| 🚀 Start Dev | `npm run dev` | Start development server |
| 🔨 Build | `npm run build` | Create production build |
| 🔍 Lint | `npm run lint` | Run ESLint |
| 👁️ Preview | `npm run preview` | Preview production build |

---

## 🔑 Environment Variables

```env
# 🌐 API Configuration
VITE_API_URL=http://localhost:5000/api

# 🔐 Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# ⏱️ Optional: API Timeout (ms)
VITE_API_TIMEOUT=30000
```

---

## 📱 Responsive Design

### Breakpoints
| Device | Size | Tailwind |
|--------|------|----------|
| 📱 Mobile | Up to 640px | `sm` |
| 📱 Tablet | 641px - 1024px | `md` `lg` |
| 💻 Desktop | 1025px+ | `xl` `2xl` |

### Mobile-First Approach
Components are designed mobile-first then enhanced for larger screens:
```jsx
<div className="flex-col lg:flex-row md:flex-col p-4 lg:p-8">
  {/* Responsive content */}
</div>
```

## 🚀 Performance Optimization

### Code Splitting
React Router enables automatic code splitting per route.

### Image Optimization
Use Tailwind's responsive images:
```jsx
<img 
  src="image.jpg" 
  className="w-full lg:w-1/2" 
  alt="Description"
/>
```

### Lazy Loading
```jsx
import { lazy, Suspense } from 'react';

const Profile = lazy(() => import('./pages/Profile'));

<Suspense fallback={<Loader />}>
  <Profile />
</Suspense>
```

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| 🔵 Chrome | Latest | ✅ |
| 🔴 Firefox | Latest | ✅ |
| 🔷 Safari | Latest | ✅ |
| 🟦 Edge | Latest | ✅ |
| 📱 Mobile | Latest | ✅ |

## 🔒 Security Practices

### 🔐 JWT Handling
- Store token securely
- Include in Authorization header
- Remove on logout

## 🔒 Security Practices

### 🔐 JWT Handling
- Store token securely
- Include in Authorization header
- Remove on logout

### ✔️ Input Validation
- Validate email format
- Check password strength
- Sanitize user input

### 🌐 CORS
- Backend configured for frontend origin
- Credentials included in requests

### 🔑 Environment Variables
- Never expose API keys
- Use VITE_ prefix for client-side vars
- Keep secrets in .env (git ignored)

---

## 🐛 Common Issues & Solutions

### ❌ CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**✅ Solution:**
- Ensure backend is running
- Check `VITE_API_URL` matches backend URL
- Verify backend CORS configuration

### ❌ 404 on Page Refresh
```
Cannot GET /product/123
```
**✅ Solution:**
- Configure Vite for SPA routing in `vite.config.js`
- Client-side routing handles navigation

### ❌ Bundle Size Large
**✅ Solution:**
- Use dynamic imports for routes
- Tree-shake unused dependencies
- Minify CSS with Tailwind

### ❌ Token Expired
**✅ Solution:**
- Implement token refresh logic
- Redirect to login on 401
- Save token expiry time

### ❌ Node Modules Issue
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### ❌ Vite Port Conflict
```bash
# Use different port
npm run dev -- --port 3000
```

---

## 💻 Development Workflow

### ✅ Create New Component
```jsx
// src/components/MyComponent.jsx
export const MyComponent = () => {
  return <div>Component</div>;
};
```

### ✅ Create New Page
```jsx
// src/pages/MyPage.jsx
export default function MyPage() {
  return <div>Page content</div>;
}
```

### ✅ Add Route
```jsx
// In App.jsx
<Route path="/mypage" element={<MyPage />} />
```

### ✅ Use State
```jsx
import { useAuthStore } from './store/useAuthStore';

const MyComponent = () => {
  const { user } = useAuthStore();
  return <div>{user?.name}</div>;
};
```

---

## 🚀 Building for Production

### Build Optimized Bundle
```bash
npm run build
```

Output in `dist/` folder - ready for deployment.

### Deploy Options
| Platform | Method |
|----------|--------|
| ▲ **Vercel** | One-click deploy |
| 🎯 **Netlify** | Drag & drop |
| 📄 **GitHub Pages** | Static hosting |
| ☁️ **AWS S3** | CloudFront CDN |
| 🌊 **DigitalOcean** | Droplets/App Platform |

---

## 📚 Dependencies

### Production 📦
| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^19.2.0 | UI library |
| **react-dom** | ^19.2.0 | DOM rendering |
| **react-router-dom** | ^7.13.1 | Client routing |
| **zustand** | ^5.0.11 | State management |
| **axios** | ^1.13.6 | HTTP client |
| **tailwindcss** | ^4.2.1 | Styling |
| **gsap** | ^3.14.2 | Animations |
| **lucide-react** | ^0.575.0 | Icons |

### Development 🔨
| Package | Purpose |
|---------|---------|
| **vite** | Build tool |
| **@vitejs/plugin-react** | React plugin |
| **eslint** | Code linting |

---

## 🐛 Troubleshooting

## 🐛 Troubleshooting

### ❌ Node Modules Issue
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### ❌ Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear Vite cache
rm -rf .vite
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test
3. Commit: `git commit -m 'Add new feature'`
4. Push: `git push origin feature/new-feature`
5. Create Pull Request

---

## 🎨 Code Style

- ✅ Use functional components with hooks
- ✅ Use Zustand for state management
- ✅ Follow React best practices
- ✅ Use Tailwind for styling
- ✅ Keep components focused and reusable
- ✅ Add meaningful comments

---

## 🚀 Future Enhancements

- [ ] Product filtering and sorting
- [ ] Product reviews and ratings
- [ ] Payment gateway integration
- [ ] Order tracking system
- [ ] Wishlist feature
- [ ] Product comparison
- [ ] Advanced search
- [ ] Dark/light theme toggle
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support

---

## 📄 License

ISC

---

<div align="center">

### 🎨 **Frontend Documentation Complete** 🎨

Made with ❤️ for women's empowerment

**[← Back to Main README](../README.md)** • **[View Backend →](../backend/README.md)**

</div>
