import React from 'react';
import { User, Package, Settings, LogOut } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <p className="text-[#d4b982] font-serif text-xl uppercase">Jane Doe</p>
            <p className="text-gray-400 text-sm">Member since 2026</p>
          </div>
          <button className="w-full flex items-center space-x-3 bg-white/10 text-white px-4 py-3 rounded-lg transition-colors">
            <User size={18} /> <span>Account Detail</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-gray-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-colors">
            <Package size={18} /> <span>My Orders</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-gray-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-colors">
            <Settings size={18} /> <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-red-400 hover:bg-red-400/10 px-4 py-3 rounded-lg transition-colors mt-8">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-serif text-[#d4b982] mb-6 uppercase tracking-widest">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
              <div>
                <p className="text-gray-500 text-sm mb-1">Full Name</p>
                <p className="text-white border-b border-white/10 pb-2">Jane Doe</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Email Address</p>
                <p className="text-white border-b border-white/10 pb-2">jane.doe@example.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Phone Number</p>
                <p className="text-white border-b border-white/10 pb-2">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-serif text-[#d4b982] mb-6 uppercase tracking-widest">Recent Orders</h3>
            <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-xl">
              <Package size={40} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">You haven't placed any orders yet.</p>
              <button className="mt-4 text-[#d4b982] hover:underline">Start Shopping</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;