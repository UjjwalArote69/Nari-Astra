import React, { useEffect, useRef } from 'react';
import { ShieldAlert, Fingerprint, Eye, Ruler } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Page Header Animation (Triggers immediately on load)
      gsap.fromTo(".header-anim",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.1 }
      );

      // 2. Feature Deep Dive Blocks (Triggers on scroll)
      const featureRows = gsap.utils.toArray(".feat-row");
      featureRows.forEach((row) => {
        // Grab the image and text elements inside this specific row
        const img = row.querySelector(".feat-img");
        const textElements = row.querySelectorAll(".feat-text-el");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%", // Triggers when the top of the row hits 75% viewport height
            toggleActions: "play none none none"
          }
        });

        // Image zooms in subtly
        tl.fromTo(img,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
        // Text elements stagger up
        .fromTo(textElements,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.8" // Overlap with image animation
        );
      });

      // 3. Technical Specifications Grid
      const specsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".specs-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      specsTl.fromTo(".spec-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".spec-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={comp} className="bg-[#05080f] min-h-screen pt-32 pb-24 font-sans text-gray-200 overflow-hidden">
      
      {/* 1. Page Header */}
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto text-center mb-32 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#c2a353]/10 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="header-anim opacity-0 text-5xl md:text-7xl font-serif text-[#e4cc76] mb-6 tracking-wide drop-shadow-sm">
          Engineered for Confidence
        </h1>
        <p className="header-anim opacity-0 text-gray-400 text-[16px] md:text-[18px] leading-[1.8] font-light max-w-2xl mx-auto">
          Every millimeter of Nari Astra is purposefully designed to offer uncompromising stopping power housed within an elegant, discreet silhouette.
        </p>
      </section>

      {/* 2. Alternating Feature Deep Dives */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto space-y-32 mb-32 relative z-10">
        
        {/* Feature Block 1: The Formula */}
        <div className="feat-row grid md:grid-cols-2 gap-12 lg:gap-24 items-center group">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <div className="feat-text-el opacity-0 mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#c2a353]"></span>
              <span className="text-[#c2a353] text-[12px] uppercase tracking-[0.2em] font-medium">The Formula</span>
            </div>
            <h2 className="feat-text-el opacity-0 text-3xl md:text-4xl font-serif text-white mb-6 leading-snug">
              Maximum Strength <br />OC Pepper + UV Dye
            </h2>
            <p className="feat-text-el opacity-0 text-gray-400 text-[15px] leading-[1.8] font-light mb-8">
              Our proprietary formula utilizes the highest concentration of Oleoresin Capsicum permitted by law, causing immediate inflammation and temporary blindness. The infused invisible UV dye marks the attacker, aiding law enforcement in identification long after the incident.
            </p>
            <ul className="space-y-4">
              <li className="feat-text-el opacity-0 flex items-start gap-3 text-[14px] text-gray-300 font-light">
                <ShieldAlert size={18} className="text-[#c2a353] mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>Instant stopping power neutralizing threats up to 45 minutes.</span>
              </li>
              <li className="feat-text-el opacity-0 flex items-start gap-3 text-[14px] text-gray-300 font-light">
                <Eye size={18} className="text-[#c2a353] mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>Invisible UV marking dye for suspect identification.</span>
              </li>
            </ul>
          </div>
          <div className="feat-img opacity-0 order-1 md:order-2 h-[550px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/5 group-hover:border-[#c2a353]/30 transition-colors duration-700">
            <img 
              src="/spray/spray-ingredients.png" 
              alt="Formula action" 
              className="w-full -mt-3 h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>

        {/* Feature Block 2: The Hardware */}
        <div className="feat-row grid md:grid-cols-2 gap-12 lg:gap-24 items-center group">
          <div className="feat-img opacity-0 h-[450px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/5 group-hover:border-[#c2a353]/30 transition-colors duration-700">
            <img 
              src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop" 
              alt="Hardware design" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="feat-text-el opacity-0 mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#c2a353]"></span>
              <span className="text-[#c2a353] text-[12px] uppercase tracking-[0.2em] font-medium">The Hardware</span>
            </div>
            <h2 className="feat-text-el opacity-0 text-3xl md:text-4xl font-serif text-white mb-6 leading-snug">
              Fail-Proof Safety <br />Lock Mechanism
            </h2>
            <p className="feat-text-el opacity-0 text-gray-400 text-[15px] leading-[1.8] font-light mb-8">
              A premium product must be safe to carry. The Nari Astra features a deliberate twist-and-press actuator. This prevents any accidental discharge in your purse or pocket while ensuring the spray is instantly ready when drawn.
            </p>
            <ul className="space-y-4">
              <li className="feat-text-el opacity-0 flex items-start gap-3 text-[14px] text-gray-300 font-light">
                <Fingerprint size={18} className="text-[#c2a353] mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>Ergonomic finger grip for intuitive directional aim in the dark.</span>
              </li>
              <li className="feat-text-el opacity-0 flex items-start gap-3 text-[14px] text-gray-300 font-light">
                <Ruler size={18} className="text-[#c2a353] mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>Reinforced, leak-proof aluminum casing with a luxury finish.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Technical Specifications Grid */}
      <section className="specs-section bg-[#091020] py-24 px-6 border-y border-[#c2a353]/10">
        <div className="max-w-[1000px] mx-auto">
          <h3 className="spec-title opacity-0 text-3xl font-serif text-center text-[#e4cc76] mb-16 tracking-wide">
            Technical Specifications
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {/* Spec 1 */}
            <div className="spec-card opacity-0 text-center p-6 border-r border-[#c2a353]/10 last:border-0 md:last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
              <div className="text-3xl font-serif text-white mb-2">12 FT</div>
              <div className="text-[#c2a353] text-[11px] uppercase tracking-[0.15em] font-medium mb-2">Effective Range</div>
              <p className="text-gray-500 text-[12px] font-light">Keeps you at a safe distance from threats.</p>
            </div>
            
            {/* Spec 2 */}
            <div className="spec-card opacity-0 text-center p-6 border-r border-[#c2a353]/10 last:border-0 md:last:border-r-0 hidden md:block">
              <div className="text-3xl font-serif text-white mb-2">25</div>
              <div className="text-[#c2a353] text-[11px] uppercase tracking-[0.15em] font-medium mb-2">Bursts</div>
              <p className="text-gray-500 text-[12px] font-light">Multiple short bursts per canister.</p>
            </div>

            {/* Spec 2 (Mobile alignment fix) */}
            <div className="spec-card opacity-0 text-center p-6 border-r-0 md:hidden">
              <div className="text-3xl font-serif text-white mb-2">25</div>
              <div className="text-[#c2a353] text-[11px] uppercase tracking-[0.15em] font-medium mb-2">Bursts</div>
              <p className="text-gray-500 text-[12px] font-light">Multiple bursts per canister.</p>
            </div>
            
            {/* Spec 3 */}
            <div className="spec-card opacity-0 text-center p-6 border-r border-[#c2a353]/10 last:border-0 md:last:border-r-0 [&:nth-child(3)]:border-r-0 md:[&:nth-child(3)]:border-r">
              <div className="text-3xl font-serif text-white mb-2">Stream</div>
              <div className="text-[#c2a353] text-[11px] uppercase tracking-[0.15em] font-medium mb-2">Spray Pattern</div>
              <p className="text-gray-500 text-[12px] font-light">Reduces wind blowback significantly.</p>
            </div>
            
            {/* Spec 4 */}
            <div className="spec-card opacity-0 text-center p-6">
              <div className="text-3xl font-serif text-white mb-2">4 YR</div>
              <div className="text-[#c2a353] text-[11px] uppercase tracking-[0.15em] font-medium mb-2">Shelf Life</div>
              <p className="text-gray-500 text-[12px] font-light">Long-lasting reliability guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;