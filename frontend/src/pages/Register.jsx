import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register, googleLogin, isLoading, error, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
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
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 bg-black">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-4xl font-serif text-[#d4b982] text-center mb-2 uppercase tracking-widest">
          Join Us
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-tighter">
          Start Your Journey with Nari Astra
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm font-medium animate-pulse bg-red-500/10 py-2 rounded">
            {error}
          </p>
        )}
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Jane Doe"
              required
              value={formData.name}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="jane@example.com"
              required
              value={formData.email}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
              onChange={handleChange}
            />
          </div>

          <button 
            disabled={isLoading} 
            className="w-full bg-[#d4b982] text-black font-bold py-3 rounded-lg uppercase tracking-widest mt-4 hover:bg-[#c4a972] transition-all disabled:opacity-50 shadow-lg shadow-[#d4b982]/10"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0f0f0f] px-2 text-gray-500 tracking-widest">Or Register With</span>
          </div>
        </div>

        {/* Google Registration Section */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Registration Failed')}
            theme="dark"
            shape="pill"
            text="signup_with"
          />
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#d4b982] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;