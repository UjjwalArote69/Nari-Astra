import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-4xl font-serif text-[#d4b982] text-center mb-2 uppercase tracking-widest">Join Us</h2>
        {error && <p className="text-red-500 text-center mb-4 text-sm font-medium">{error}</p>}
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name"
            required
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982]"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email Address"
            required
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982]"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password"
            required
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982]"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button disabled={isLoading} className="w-full bg-[#d4b982] text-black font-bold py-3 rounded-lg uppercase tracking-widest mt-4">
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;