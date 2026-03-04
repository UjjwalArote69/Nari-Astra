import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeItem } = useCartStore();

  return (
    <div className="min-h-screen pt-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif text-[#d4b982] mb-12">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.cartId} className="flex items-center justify-between bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-6">
                <img src={item.image} alt={item.name} className="h-20 w-auto" />
                <div>
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <p className="text-[#d4b982] text-sm uppercase">{item.packSize} Pack</p>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <span className="text-white font-serif">₹{(item.price * item.quantity).toLocaleString()}</span>
                <button onClick={() => removeItem(item.cartId)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;