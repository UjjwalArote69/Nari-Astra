import React, { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "Neha M.",
    text: "A perfect blend of elegance and safety. Highly recommend.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Priya S.",
    text: "A stylish essential for peace of mind. Fits right in my purse.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Ariya K.",
    text: "A stylish essential for peace of mind. I carry it everywhere.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bfa8ea?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Deepa R.",
    text: "A stylish essential for peace of mind and confidence.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Anjali T.",
    text: "Premium quality. I bought one for myself and my sister.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  const comp = useRef(null);
  const scrollRef = useRef(null);
  
  // --- Drag to Scroll State ---
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  // --- GSAP Animations ---
  useEffect(() => {
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: comp.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });

        tl.fromTo(".testi-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(".testi-card",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(".testi-dots",
          { y: 20, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.4"
        );
      }, comp);
      return () => ctx.revert();
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  // --- Drag Handlers ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevents text highlighting while dragging
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Multiplier controls drag speed
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section ref={comp} className="py-24 px-0 bg-[#000000] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <h2 className="testi-title opacity-0 text-4xl md:text-5xl font-serif text-center text-[#c2a353] tracking-wide">
          Testimonials
        </h2>
      </div>

      <div className="relative w-full">
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          // Added drag styles: select-none to prevent highlighting, cursor-grab, and we turn off snap while dragging so it doesn't fight the mouse
          className={`flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 pt-4 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
          }`}
        >
          {testimonialsData.map((item) => (
            <div 
              key={item.id} 
              // Added pointer-events-none to the card to prevent image dragging from interfering with our custom scroll drag
              className="testi-card opacity-0 flex-shrink-0 w-[280px] md:w-[320px] snap-center bg-[#1a1a1a] border border-[#c2a353]/40 rounded-2xl overflow-hidden shadow-xl hover:border-[#c2a353]/80 transition-colors duration-300 pointer-events-none"
            >
              <div className="h-[220px] w-full overflow-hidden border-b border-[#c2a353]/20">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              <div className="p-6 flex flex-col items-center text-center">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={`star-${item.id}-${i}`}
                      size={16} 
                      className="text-[#c2a353] fill-[#c2a353]" 
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 text-[14px] leading-[1.6] mb-4 font-light">
                  {item.text}
                </p>
                
                <span className="text-gray-400 text-[12px] uppercase tracking-wider font-medium">
                  - {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testi-dots opacity-0 flex justify-center items-center gap-3 mt-8">
        <div className="w-2.5 h-2.5 rounded-full bg-[#c2a353] transition-all"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#c2a353]/30 transition-all"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#c2a353]/30 transition-all"></div>
      </div>
    </section>
  );
};

export default Testimonials;