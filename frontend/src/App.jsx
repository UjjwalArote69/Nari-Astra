import React, {
  useState,
  Suspense,
  lazy,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";
import ScrollToTop from "./components/layout/ScrollToTop";

const Home = lazy(
  () => import("./pages/Home"),
);
const Features = lazy(
  () => import("./pages/Features"),
);
const Story = lazy(
  () => import("./pages/Story"),
);
const Safety = lazy(
  () => import("./pages/Safety"),
);
const Shop = lazy(
  () => import("./pages/Shop"),
);
const Contact = lazy(
  () => import("./pages/Contact"),
);
const Register = lazy(
  () => import("./pages/Register"),
);
const Login = lazy(
  () => import("./pages/Login"),
);
const Profile = lazy(
  () => import("./pages/Profile"),
);
const Cart = lazy(
  () => import("./pages/Cart"),
);
import { useAuthStore } from "./store/useAuthStore";

const PageLoader = () => (
  <div className="pt-40 text-center text-[#d4b982] flex justify-center items-center h-screen">
    Loading...
  </div>
);
function App() {
  const { isLoggedIn } = useAuthStore();
  const [
    isAppLoading,
    setIsAppLoading,
  ] = useState(true);
  // 2. Create a fallback UI to show while the lazy-loaded chunk is fetching
  return (
    <Router>
      {isAppLoading && (
        <Loader
          onComplete={() =>
            setIsAppLoading(false)
          }
        />
      )}

      <div className="min-h-screen bg-[#05080f] font-sans text-gray-200 flex flex-col">
        <Navbar />
        <ScrollToTop />
        <main className="grow">
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/features"
              element={<Features />}
            />
            <Route
              path="/story"
              element={<Story />}
            />
            <Route
              path="/safety"
              element={<Safety />}
            />
            <Route
              path="/shop"
              element={<Shop />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Auth Routes with Protection */}
            <Route
              path="/register"
              element={
                !isLoggedIn ? (
                  <Register />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Catch-all 404 */}
            <Route
              path="*"
              element={
                <div className="pt-40 text-center text-white">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
