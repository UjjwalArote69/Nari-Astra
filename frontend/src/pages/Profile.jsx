/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; 
import { Package, Settings, LogOut, User, MapPin, Plus, ShieldCheck, Trash2 } from 'lucide-react';
const Profile = () => {
  const { user, logout, isLoggedIn, changePassword, fetchAddresses, addAddress, deleteAddress, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  // Navigation and Feedback State
  const [activeTab, setActiveTab] = useState('details'); 
  const [successMsg, setSuccessMsg] = useState('');
  
  // Password State
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  
  // Address State
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '' });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    // Refresh addresses whenever the address tab is opened
    if (activeTab === 'address') {
        loadAddresses();
    }
    // Clear messages when switching tabs
    setSuccessMsg('');
  }, [isLoggedIn, navigate, activeTab]);

  const loadAddresses = async () => {
    const data = await fetchAddresses();
    if (data) setAddresses(data);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const result = await changePassword(passwords);
    if (result.success) {
      setSuccessMsg(result.message || "Password updated successfully");
      setPasswords({ oldPassword: '', newPassword: '' });
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const result = await addAddress(newAddress);
    if (result.success) {
        setSuccessMsg("Address added successfully");
        setNewAddress({ street: '', city: '', state: '', zip: '' });
        loadAddresses();
    }
  };

  const handleDeleteAddress = async (id) => {
    // Optional: Add a confirmation dialog
    if (window.confirm("Are you sure you want to delete this address?")) {
        const result = await deleteAddress(id);
        if (result.success) {
            setSuccessMsg("Address deleted successfully");
            loadAddresses(); // Refresh the list
        } else {
            // Handle error (optional)
            alert(result.message);
        }
    }
  };

  if (!user) return <div className="min-h-screen bg-[#05080f]" />;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto bg-black text-white">
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

            <button 
              onClick={() => setActiveTab('address')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'address' ? 'text-white bg-white/10' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <MapPin size={18} className={activeTab === 'address' ? 'text-[#d4b982]' : ''} /> 
              <span>My Addresses</span>
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
              <ShieldCheck size={18} className={activeTab === 'settings' ? 'text-[#d4b982]' : ''} /> 
              <span>Security Settings</span>
            </button>
          </nav>

          <button onClick={handleLogout} className="w-full flex items-center space-x-3 text-red-400 hover:bg-red-400/10 px-4 py-3 rounded-lg mt-8 font-sans border border-red-400/20 transition-colors">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          
          {/* TAB: ACCOUNT DETAILS */}
          {activeTab === 'details' && (
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
              </div>
            </div>
          )}

          {/* TAB: MY ADDRESSES */}
          {activeTab === 'address' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-in fade-in duration-500">
                <h3 className="text-2xl font-serif text-[#d4b982] mb-6 uppercase tracking-widest">Saved Addresses</h3>
                
                <div className="grid grid-cols-1 gap-4 mb-8">
                    {addresses.length > 0 ? addresses.map((addr) => (
                        <div key={addr.id} className="p-4 bg-black/30 border border-white/5 rounded-lg flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-[#d4b982] mt-1" />
                                <div>
                                    <p className="text-white text-sm">{addr.street}</p>
                                    <p className="text-gray-400 text-xs">{addr.city}, {addr.state} - {addr.zip}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                title="Delete Address"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )) : (
                        <p className="text-gray-500 text-sm italic">No addresses saved yet.</p>
                    )}
                </div>

                <h4 className="text-white text-xs uppercase tracking-widest mb-4 flex items-center gap-2 border-t border-white/10 pt-6">
                    <Plus size={14} className="text-[#d4b982]" /> Add New Delivery Address
                </h4>
                <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                        type="text" placeholder="Street Address" required
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                        className="sm:col-span-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b982] outline-none transition-colors"
                    />
                    <input 
                        type="text" placeholder="City" required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b982] outline-none transition-colors"
                    />
                    <input 
                        type="text" placeholder="State" required
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b982] outline-none transition-colors"
                    />
                    <input 
                        type="text" placeholder="Zip Code" required
                        value={newAddress.zip}
                        onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                        className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b982] outline-none transition-colors"
                    />
                    <button type="submit" className="sm:col-span-2 bg-[#d4b982] text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-[#c4a972] transition-colors">
                        Save Address
                    </button>
                </form>
            </div>
          )}

          {/* TAB: SECURITY SETTINGS (PASSWORD CHANGE) */}
          {activeTab === 'settings' && (
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
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-[11px] uppercase tracking-wider ml-1">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4b982] transition-colors"
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