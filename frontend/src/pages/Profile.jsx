import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; 
import { Package, Settings, LogOut, User, Lock } from 'lucide-react';

const Profile = () => {
  // Pull user data and auth actions directly from the store
  const { user, logout, isLoggedIn, changePassword, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  // State for UI toggles and form handling
  const [activeTab, setActiveTab] = useState('details'); 
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [successMsg, setSuccessMsg] = useState('');

  // Redirect to login if the session is lost
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    
    // Call the store action which hits the /users/change-password endpoint
    const result = await changePassword(passwords);
    if (result.success) {
      setSuccessMsg(result.message);
      setPasswords({ oldPassword: '', newPassword: '' }); // Clear form on success
    }
  };

  // Prevent rendering if user data isn't loaded yet
  if (!user) return <div className="min-h-screen bg-[#05080f]" />;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <p className="text-[#d4b982] font-serif text-xl uppercase tracking-wider">{user.name}</p>
            <p className="text-gray-400 text-sm font-sans italic">Verified Member</p>
          </div>
          
          <nav className="space-y-1 font-sans">
            <button 
              onClick={() => setActiveTab('details')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'details' ? 'text-white bg-white/10' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <User size={18} className={activeTab === 'details' ? 'text-[#d4b982]' : ''} /> 
              <span>Account Details</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors">
              <Package size={18} /> <span>My Orders</span>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'text-white bg-white/10' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Settings size={18} className={activeTab === 'settings' ? 'text-[#d4b982]' : ''} /> 
              <span>Settings</span>
            </button>
          </nav>

          <button 
            onClick={handleLogout} 
            className="w-full flex items-center space-x-3 text-red-400 hover:bg-red-400/10 px-4 py-3 rounded-lg transition-colors mt-8 font-sans border border-red-400/20"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          {activeTab === 'details' ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-in fade-in duration-500">
              <h3 className="text-2xl font-serif text-[#d4b982] mb-6 uppercase tracking-widest">Account Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans">
                <div>
                  <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] mb-2 font-medium">Full Name</p>
                  <p className="text-white border-b border-white/10 pb-2 text-[15px]">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] mb-2 font-medium">Email Address</p>
                  <p className="text-white border-b border-white/10 pb-2 text-[15px]">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] mb-2 font-medium">Member Since</p>
                  <p className="text-white border-b border-white/10 pb-2 text-[15px]">March 2026</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-serif text-[#d4b982] mb-6 uppercase tracking-widest">Security Settings</h3>
              
              <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-6">
                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                    {error}
                  </p>
                )}
                {successMsg && (
                  <p className="text-green-400 text-sm bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                    {successMsg}
                  </p>
                )}
                
                <div className="space-y-2">
                  <label className="text-gray-400 text-[11px] uppercase tracking-wider ml-1">Current Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-[11px] uppercase tracking-wider ml-1">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#d4b982] text-black font-bold py-3 px-8 rounded-lg uppercase tracking-widest hover:bg-[#c4a972] transition-all disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;