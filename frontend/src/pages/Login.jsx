import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-4xl font-serif text-[#d4b982] text-center mb-2 uppercase tracking-widest">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8 font-sans">Enter your credentials to access your account</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400">
              <input type="checkbox" className="mr-2 accent-[#d4b982]" /> Remember me
            </label>
            <a href="#" className="text-[#d4b982] hover:underline">Forgot password?</a>
          </div>

          <button className="w-full bg-[#d4b982] text-black font-bold py-3 rounded-lg hover:bg-[#c4a972] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-widest">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account? {' '}
          <Link to="/register" className="text-[#d4b982] font-semibold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;