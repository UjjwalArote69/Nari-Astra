import React, { useEffect, useRef } from 'react';
import { Unlock, Crosshair, Wind, Footprints, ShieldCheck, AlertTriangle, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Safety = () => {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Page Header Animation (Loads immediately)
      gsap.fromTo(".safety-header-el",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.1 }
      );

      // 2. The 4-Step Deployment Cards
      gsap.fromTo(".step-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15, // Cascades the cards one by one
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".steps-section",
            start: "top 75%", // Triggers when section is 75% down viewport
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Deep Dive: Twist-Lock Mechanism
      const lockTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".lock-section",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Animate the image first
      lockTl.fromTo(".lock-img",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      // Stagger the text elements while image is animating
      .fromTo(".lock-text-el",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.8"
      );

      // 4. Best Practices / Disclaimer Section
      gsap.fromTo(".disclaimer-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".disclaimer-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={comp} className="bg-[#05080f] min-h-screen pt-32 pb-24 font-sans text-gray-200 relative overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c2a353]/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#c2a353]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* 1. Page Header */}
      <section className="px-6 md:px-12 max-w-[900px] mx-auto text-center mb-24 relative z-10">
        <h2 className="safety-header-el opacity-0 text-[#c2a353] text-[12px] uppercase tracking-[0.3em] font-medium mb-6">
          Protocol & Preparedness
        </h2>
        <h1 className="safety-header-el opacity-0 text-5xl md:text-7xl font-serif text-[#e4cc76] mb-8 tracking-wide drop-shadow-sm">
          How to Use <br className="hidden md:block" /> Nari Astra
        </h1>
        <p className="safety-header-el opacity-0 text-gray-400 text-[16px] md:text-[18px] leading-[1.8] font-light max-w-2xl mx-auto">
          Nari Astra is a highly effective defense tool. Familiarizing yourself with its mechanics ensures you can deploy it instantly and confidently under pressure.
        </p>
      </section>

      {/* 2. Step-by-Step Instructions (How to Use) */}
      <section className="steps-section px-6 md:px-12 max-w-[1200px] mx-auto mb-32">
        <h3 className="safety-header-el opacity-0 text-3xl font-serif text-center text-white mb-16 tracking-wide">
          The 4-Step Deployment
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Step 1 */}
          <div className="step-card opacity-0 bg-[#0a0f1c] p-8 rounded-2xl border border-[#c2a353]/20 relative group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute -top-5 -left-5 text-6xl font-serif text-[#c2a353]/20 group-hover:text-[#c2a353]/40 transition-colors duration-500">
              01
            </div>
            <Unlock className="text-[#c2a353] mb-6" size={36} strokeWidth={1.5} />
            <h4 className="text-xl font-serif text-white mb-3">Disengage Lock</h4>
            <p className="text-gray-400 text-[14px] leading-[1.7] font-light">
              Slide your thumb under the protective cap and twist the actuator firmly to the right to unlock the mechanism.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card opacity-0 bg-[#0a0f1c] p-8 rounded-2xl border border-[#c2a353]/20 relative group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute -top-5 -left-5 text-6xl font-serif text-[#c2a353]/20 group-hover:text-[#c2a353]/40 transition-colors duration-500">
              02
            </div>
            <Crosshair className="text-[#c2a353] mb-6" size={36} strokeWidth={1.5} />
            <h4 className="text-xl font-serif text-white mb-3">Take Aim</h4>
            <p className="text-gray-400 text-[14px] leading-[1.7] font-light">
              Hold the canister firmly at eye level. Aim directly at the attacker's face, specifically targeting the eyes and nose.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card opacity-0 bg-[#0a0f1c] p-8 rounded-2xl border border-[#c2a353]/20 relative group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute -top-5 -left-5 text-6xl font-serif text-[#c2a353]/20 group-hover:text-[#c2a353]/40 transition-colors duration-500">
              03
            </div>
            <Wind className="text-[#c2a353] mb-6" size={36} strokeWidth={1.5} />
            <h4 className="text-xl font-serif text-white mb-3">Deploy Spray</h4>
            <p className="text-gray-400 text-[14px] leading-[1.7] font-light">
              Press down firmly on the actuator. Spray in a sweeping motion from ear to ear across the attacker's face.
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-card opacity-0 bg-[#c2a353] p-8 rounded-2xl border border-[#c2a353] relative group hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_30px_rgba(196,161,84,0.15)]">
            <div className="absolute -top-5 -left-5 text-6xl font-serif text-black/20 group-hover:text-black/30 transition-colors duration-500">
              04
            </div>
            <Footprints className="text-black mb-6" size={36} strokeWidth={1.5} />
            <h4 className="text-xl font-serif text-black mb-3 font-semibold">Escape & Report</h4>
            <p className="text-black/80 text-[14px] leading-[1.7] font-medium">
              Do not wait to see the effects. Turn and run immediately to a safe, populated area and call local authorities.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Deep Dive: The Safety Mechanism */}
      <section className="lock-section bg-[#091020] py-24 px-6 md:px-12 border-y border-[#c2a353]/10 mb-32">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <h3 className="lock-text-el opacity-0 text-3xl md:text-4xl font-serif text-[#e4cc76] mb-6">
              The Twist-Lock Mechanism
            </h3>
            <p className="lock-text-el opacity-0 text-gray-400 text-[15px] leading-[1.8] font-light mb-8">
              Carrying a defense tool should never cause anxiety. Nari Astra is engineered with a rigid, tactical twist-lock system. It requires a deliberate, human motion to engage, guaranteeing zero accidental discharges in your purse, pocket, or hand.
            </p>
            <ul className="space-y-6">
              <li className="lock-text-el opacity-0 flex gap-4">
                <ShieldCheck className="text-[#c2a353] shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <h5 className="text-white text-[15px] font-medium mb-1">Purse Safe</h5>
                  <p className="text-gray-500 text-[13px] font-light">Will not fire if bumped or crushed by keys or cosmetics.</p>
                </div>
              </li>
              <li className="lock-text-el opacity-0 flex gap-4">
                <EyeOff className="text-[#c2a353] shrink-0" size={24} strokeWidth={1.5} />
                <div>
                  <h5 className="text-white text-[15px] font-medium mb-1">No-Look Orientation</h5>
                  <p className="text-gray-500 text-[13px] font-light">The ergonomic grip ensures you always point it in the right direction, even in complete darkness.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="lock-img opacity-0 order-1 md:order-2 h-[400px] rounded-2xl overflow-hidden border border-[#c2a353]/20 shadow-2xl">
            <img 
              src="/spray/spray-image.png" 
              alt="Safety lock detail" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Best Practices / Disclaimer */}
      <section className="disclaimer-section px-6 md:px-12 max-w-[1000px] mx-auto text-center">
        <AlertTriangle className="disclaimer-el opacity-0 text-[#c2a353] mx-auto mb-6" size={40} strokeWidth={1.5} />
        <h3 className="disclaimer-el opacity-0 text-2xl font-serif text-white mb-6">
          Ownership Responsibilities
        </h3>
        <p className="disclaimer-el opacity-0 text-gray-400 text-[14px] md:text-[15px] leading-[1.8] font-light max-w-3xl mx-auto mb-12">
          Nari Astra contains a powerful, restricted chemical agent. It is intended strictly for self-defense in life-threatening situations. Familiarize yourself with your local laws regarding the carrying and usage of OC pepper sprays. Check the expiration date printed on the bottom of your canister yearly to ensure optimal pressure and potency.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-[#c2a353]/20 pt-12">
          <div className="disclaimer-el opacity-0">
            <span className="block text-[#c2a353] text-[11px] uppercase tracking-[0.15em] mb-2">Storage</span>
            <span className="text-gray-300 text-[13px] font-light">Keep away from extreme heat or direct sunlight.</span>
          </div>
          <div className="disclaimer-el opacity-0">
            <span className="block text-[#c2a353] text-[11px] uppercase tracking-[0.15em] mb-2">Accessibility</span>
            <span className="text-gray-300 text-[13px] font-light">Store in a dedicated, easy-to-reach pocket.</span>
          </div>
          <div className="disclaimer-el opacity-0">
            <span className="block text-[#c2a353] text-[11px] uppercase tracking-[0.15em] mb-2">Expiration</span>
            <span className="text-gray-300 text-[13px] font-light">Replace immediately after 4 years or after use.</span>
          </div>
          <div className="disclaimer-el opacity-0">
            <span className="block text-[#c2a353] text-[11px] uppercase tracking-[0.15em] mb-2">Legal</span>
            <span className="text-gray-300 text-[13px] font-light">Check local jurisdiction limits before travel.</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Safety;