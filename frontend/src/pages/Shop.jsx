import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "../store/useCartStore";
import { useProductStore } from "../store/useProductStore";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const comp = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [packSize, setPackSize] = useState("single");

  // Get state and actions from the Product Store
  const { products, fetchProducts, isLoading, error } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Professional UX: Fetch dynamic data via the store on component mount
    fetchProducts();
  }, [fetchProducts]);

  // Base price calculation based on pack size
  const basePrice = packSize === "single" ? 299 : 499;
  const originalPrice = packSize === "single" ? 499 : 899;

  const handleAddToCart = () => {
    // Use the first product from the store if available, or fall back to a default
    const dbProduct = products[0] || {};
    
    const productObj = {
      id: dbProduct.id || 'nari-astra-main',
      name: dbProduct.name || 'Nari Astra Defense Spray',
      price: basePrice,
      image: dbProduct.image || '/spray/nari-astra-spray.png'
    };
    
    addItem(productObj, quantity, packSize);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl.fromTo(".shop-img",
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2 }
      ).fromTo(".shop-detail",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.8"
      );

      // 2. Scroll Animation for "What's in the Box?"
      gsap.fromTo(".box-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".box-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, comp);

    return () => ctx.revert();
  }, [isLoading]); // Re-run animations if the view changes after loading

  // Professional UX: Handle Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
        <div className="text-[#c2a353] font-serif text-xl animate-pulse tracking-widest">
          LOADING COLLECTION...
        </div>
      </div>
    );
  }

  // Professional UX: Handle Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#05080f] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <button 
            onClick={() => fetchProducts()}
            className="text-[#c2a353] border border-[#c2a353] px-6 py-2 rounded-full hover:bg-[#c2a353]/10 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={comp} className="bg-[#05080f] min-h-screen pt-32 pb-24 font-sans text-gray-200 overflow-hidden">
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto mb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative group md:sticky md:top-32 z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#c2a353]/10 rounded-full blur-[100px] -z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-70"></div>
            <div className="shop-img opacity-0 h-[400px] md:h-[500px] lg:h-[650px] w-full bg-[#0a0f1c] rounded-2xl border border-[#c2a353]/20 flex items-center justify-center p-8 shadow-2xl relative overflow-hidden">
              <img
                src="/spray/nari-astra-spray.png"
                alt="Nari Astra Signature Edition"
                className="h-[90%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-6 left-6 bg-[#c2a353]/10 border border-[#c2a353]/40 text-[#c2a353] text-[10px] uppercase tracking-[0.2em] font-medium py-1.5 px-4 rounded-full backdrop-blur-md">
                Signature Edition
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-4 lg:pt-8 z-10">
            <nav className="shop-detail opacity-0 text-[12px] text-gray-500 uppercase tracking-widest mb-6">
              <span className="hover:text-[#c2a353] cursor-pointer transition-colors">Home</span>
              <span className="mx-2">/</span>
              <span className="hover:text-[#c2a353] cursor-pointer transition-colors">Shop</span>
              <span className="mx-2">/</span>
              <span className="text-[#c2a353]">Nari Astra</span>
            </nav>

            <h1 className="shop-detail opacity-0 text-4xl lg:text-5xl font-serif text-[#e4cc76] mb-4 tracking-wide leading-tight">
              Nari Astra <br /> Defense Spray
            </h1>

            <div className="shop-detail opacity-0 flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#c2a353] fill-[#c2a353]" />
                ))}
              </div>
              <span className="text-gray-400 text-[13px] tracking-wide font-light">(124 Customer Reviews)</span>
            </div>

            <div className="shop-detail opacity-0 flex items-end gap-4 mb-8 flex-wrap">
              <span className="text-3xl font-serif text-white">₹{basePrice.toLocaleString()}</span>
              <span className="text-lg text-gray-500 line-through mb-1 font-light">₹{originalPrice.toLocaleString()}</span>
              <span className="text-[#c2a353] text-[13px] font-medium tracking-wide mb-1.5 ml-2 border border-[#c2a353]/30 px-2 py-0.5 rounded-sm bg-[#c2a353]/5">
                Save {Math.round(((originalPrice - basePrice) / originalPrice) * 100)}%
              </span>
            </div>

            <p className="shop-detail opacity-0 text-gray-400 text-[15px] leading-[1.8] font-light mb-10 pb-10 border-b border-white/10">
              The ultimate fusion of luxury and personal safety. Featuring maximum-strength OC pepper formula, 
              an invisible UV marking dye, and a proprietary twist-lock safety mechanism.
            </p>

            <div className="shop-detail opacity-0 mb-8">
              <div className="text-white text-[13px] uppercase tracking-[0.15em] mb-4">Select Pack Size</div>
              <div className="flex gap-4">
                <button
                  onClick={() => setPackSize("single")}
                  className={`flex-1 py-4 border rounded-xl transition-all duration-300 ${packSize === "single" ? "border-[#c2a353] bg-[#c2a353]/5" : "border-white/10 hover:border-white/30"}`}
                >
                  <div className="text-white font-medium mb-1">Single Pack</div>
                  <div className="text-[#c2a353] text-[13px]">₹299</div>
                </button>
                <button
                  onClick={() => setPackSize("twin")}
                  className={`flex-1 py-4 border rounded-xl transition-all duration-300 relative overflow-hidden ${packSize === "twin" ? "border-[#c2a353] bg-[#c2a353]/5" : "border-white/10 hover:border-white/30"}`}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#e8cf9c] to-[#99762a]"></div>
                  <div className="text-white font-medium mb-1">Twin Pack</div>
                  <div className="text-[#c2a353] text-[13px]">₹499</div>
                </button>
              </div>
            </div>

            <div className="shop-detail opacity-0 flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center justify-between border border-white/20 rounded-full px-4 w-full sm:w-32 py-2 sm:py-0 bg-[#0a0f1c] shrink-0">
                <button onClick={handleDecrease} className="text-gray-400 hover:text-white transition-colors p-2">
                  <Minus size={16} />
                </button>
                <span className="text-white font-medium text-[15px]">{quantity}</span>
                <button onClick={handleIncrease} className="text-gray-400 hover:text-white transition-colors p-2">
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-[#e8cf9c] via-[#c4a154] to-[#99762a] text-[#111] font-bold text-[14px] py-4 px-8 rounded-full uppercase tracking-[0.15em] transition-all shadow-[0_0_30px_rgba(196,161,84,0.3)] hover:shadow-[0_0_50px_rgba(196,161,84,0.6)] flex items-center justify-center gap-3 hover:scale-[1.02]"
              >
                <ShoppingBag size={18} strokeWidth={2} />
                Add - ₹{(basePrice * quantity).toLocaleString()}
              </button>
            </div>

            <div className="shop-detail opacity-0 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#c2a353] shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <div className="text-white text-[13px] font-medium mb-0.5">4-Year Warranty</div>
                  <div className="text-gray-500 text-[11px]">Guaranteed potency.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-[#c2a353] shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <div className="text-white text-[13px] font-medium mb-0.5">Free Shipping</div>
                  <div className="text-gray-500 text-[11px]">On orders over ₹2000.</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-[#c2a353] shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <div className="text-white text-[13px] font-medium mb-0.5">Easy Returns</div>
                  <div className="text-gray-500 text-[11px]">14-day policy.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="box-section px-6 md:px-12 max-w-[800px] mx-auto border-t border-[#c2a353]/10 pt-20">
        <h3 className="box-anim opacity-0 text-2xl font-serif text-center text-[#e4cc76] mb-12 tracking-wide">
          What's in the Box?
        </h3>
        <div className="space-y-6">
          <div className="box-anim opacity-0 bg-[#0a0f1c] p-6 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <div className="text-[#c2a353] font-serif text-2xl">01</div>
            <div>
              <h4 className="text-white text-[16px] font-medium mb-2">Nari Astra Canister</h4>
              <p className="text-gray-400 text-[14px] font-light leading-relaxed">
                Premium self-defense spray, pre-loaded with maximum strength OC formula and UV dye.
              </p>
            </div>
          </div>
          <div className="box-anim opacity-0 bg-[#0a0f1c] p-6 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <div className="text-[#c2a353] font-serif text-2xl">02</div>
            <div>
              <h4 className="text-white text-[16px] font-medium mb-2">Instructional Safety Card</h4>
              <p className="text-gray-400 text-[14px] font-light leading-relaxed">
                Quick-reference guide detailing the 4-step deployment process and safety guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;