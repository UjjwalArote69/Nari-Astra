import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {Link} from "react-router-dom";

const Hero = () => {
  const comp = useRef(null);
  const bgRef = useRef(null);
  const bottleRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  // const navigate = Navigate();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // ADDED: delay of 2.8 seconds to wait for the premium loader to finish!
      const tl = gsap.timeline({ 
        delay: 2.8, 
        defaults: { ease: "power3.out" } 
      });

      // 1. Background subtle zoom and fade in
      tl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
      // 2. Product bottle rises from the bottom
      .fromTo(
        bottleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.5" 
      )
      // 3. Main Title slides up
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1" 
      )
      // 4. Subtext slides up
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.9"
      )
      // 5. Button fades in and pops slightly
      .fromTo(
        btnRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.8"
      );
    }, comp);

    return () => ctx.revert(); // Cleanup animations on component unmount
  }, []);

  return (
    <section
      id="home"
      ref={comp}
      className="relative h-screen min-h-[750px] md:min-h-[700px] w-full bg-[#05080f] overflow-hidden"
    >
      {/* Background Image of the Woman Boxing */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-top  md:scale-105 bg-no-repeat opacity-40 md:opacity-50"
          style={{
            backgroundImage: "url('/background/herobg.png')",
          }}
        ></div>
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-[#05080f] md:bg-gradient-to-r md:from-black/50 md:via-black/30 md:to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full h-full flex flex-col md:flex-row items-center px-6 md:px-12 pt-24 md:pt-0 pb-12 md:pb-0">
        
        {/* Top on Mobile, Left on Desktop: Giant Product Bottle */}
        <div className="w-full md:w-[45%] h-[45vh] md:h-full flex items-end justify-center relative order-1 z-30">
          <img
            ref={bottleRef}
            src="/spray/nari-astra-spray.png"
            alt="Nari Astra Spray"
            /* Anchored to the bottom of its container so it grows upwards */
            className="absolute md:top-35 md:left-55 h-[115%] sm:h-[125%] md:h-[95vh] lg:h-[110%] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0"
          />
        </div>

        {/* Bottom on Mobile, Right on Desktop: Hero Copy */}
        <div className="w-full md:w-[55%] flex flex-col justify-center items-center md:items-start text-center md:text-left z-20 order-2 lg:pl-16 mt-10 md:mt-0">
          
          <h1 
            ref={titleRef}
            className="text-[52px] pt-2 sm:text-[70px] md:text-[90px] lg:text-[120px] text-transparent bg-clip-text bg-gradient-to-b from-[#fceebb] via-[#e4cc76] to-[#c2a353] font-serif mb-4 leading-none tracking-wide drop-shadow-lg opacity-0"
          >
            NARI ASTRA
          </h1>

          <p 
            ref={textRef}
            className="text-[14px] md:text-[16px] lg:text-[17px] font-light mb-8 text-gray-200 max-w-[320px] md:max-w-[400px] leading-[1.6] drop-shadow-md opacity-0"
          >
            Empowerment in Your Hand. A luxurious, powerful self-defense spray for the modern woman.
          </p>

          <div ref={btnRef} className="opacity-0">
            <Link to="/shop">
            <button 
              className="bg-gradient-to-b from-[#e8cf9c] via-[#c4a154] to-[#99762a] text-[#111] font-bold text-[12px] md:text-[13px] py-3.5 px-10 rounded-full uppercase tracking-[0.15em] transition-all shadow-[0_0_30px_rgba(196,161,84,0.4)] hover:shadow-[0_0_50px_rgba(196,161,84,0.7)] border-[1px] border-[#fceebb]/50 hover:scale-105">
              SHOP NOW
            </button>
            
            </Link>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;