import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, isLoading, error, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    // Dynamically update based on input type
    setCredentials({ ...credentials, [e.target.type]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials); 
    if (result.success) {
      // Use replace: true to prevent going back to the login screen
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-4xl font-serif text-[#d4b982] text-center mb-2 uppercase tracking-widest">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4 text-sm font-medium animate-pulse">{error}</p>}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={credentials.email}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
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
            className="w-full bg-[#d4b982] text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-[#c4a972] transition-all disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;