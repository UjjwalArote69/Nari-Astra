import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { GoogleLogin } from '@react-oauth/google'; // Requires npm install @react-oauth/google

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, googleLogin, isLoading, error, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials); 
    if (result.success) {
      navigate('/profile', { replace: true });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await googleLogin(credentialResponse.credential);
    if (result.success) {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-black">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-4xl font-serif text-[#d4b982] text-center mb-2 uppercase tracking-widest">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-tighter">
          Secure Access to Nari Astra
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm font-medium animate-pulse bg-red-500/10 py-2 rounded">
            {error}
          </p>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              name="email" // Added name attribute
              required
              value={credentials.email}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest">Password</label>
              {/* Forgot Password Link */}
              <Link 
                to="/forgot-password" 
                className="text-[#d4b982] text-xs hover:underline uppercase tracking-tighter"
              >
                Forgot?
              </Link>
            </div>
            <input 
              type="password" 
              name="password" // Added name attribute
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#d4b982] text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-[#c4a972] transition-all disabled:opacity-50 shadow-lg shadow-[#d4b982]/10"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#121212] px-2 text-gray-500 tracking-widest">Or Continue With</span>
          </div>
        </div>

        {/* Google Login Section */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
            theme="dark"
            shape="pill"
            text="signin_with"
          />
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          New to Nari Astra?{' '}
          <Link to="/register" className="text-[#d4b982] font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;