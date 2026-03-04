import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ValuesAndFAQ = () => {
  const comp = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Animate the Values Grid (Circular Images)
      gsap.fromTo(".value-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 80%", // Triggers when top of section is 80% down the screen
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Animate the FAQ Title
      gsap.fromTo(".faq-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Stagger the FAQ Accordion Items
      gsap.fromTo(".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-section",
            start: "top 70%", 
            toggleActions: "play none none none"
          }
        }
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const values = [
    {
      title: "Uncompromising Safety",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
    },
    {
      title: "Empowerment Through Elegance",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
    },
    {
      title: "Discreet Design",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop" 
    },
    {
      title: "Join the Movement",
      img: "/spray/spray-image.png" 
    }
  ];

  const faqs = [
    {
      question: "What is Nari Astra?",
      answer: "Nari Astra is a premium, highly effective self-defense spray designed specifically for the modern woman. It combines maximum stopping power with an elegant, discreet design that fits seamlessly into your lifestyle."
    },
    {
      question: "How does the safety lock work?",
      answer: "Our proprietary safety lock mechanism requires a deliberate twist-and-press motion. This ensures that the spray is instantly accessible when you need it, but completely safe from accidental discharge in your purse or pocket."
    },
    {
      question: "Is it legal to carry?",
      answer: "Yes, pepper spray is perfectly legal to carry for self-defense in most regions. However, we always recommend checking your specific local laws and regulations regarding the carrying of self-defense items."
    },
    {
      question: "What is our goal today?",
      answer: "Our mission is to empower women to walk with confidence. We believe that personal safety shouldn't require compromising on elegance, which is why we created a product that is as reliable as it is refined."
    }
  ];

  return (
    <div ref={comp}>
      {/* VALUES SECTION */}
      <section className="values-section py-20 px-6 bg-[#091020] border-t border-white/5 overflow-hidden">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {values.map((value, index) => (
            <div key={index} className="value-item opacity-0 flex flex-col items-center text-center group">
              {/* Outer thin gold ring */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#c2a353]/50 p-1.5 mb-5 transition-transform duration-500 group-hover:scale-105">
                {/* Inner Image */}
                <div className="w-full h-full rounded-full overflow-hidden border border-[#c2a353]/20">
                  <img 
                    src={value.img} 
                    alt={value.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <h4 className="text-gray-200 text-[14px] md:text-[15px] font-medium leading-snug max-w-[160px]">
                {value.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id='faq' className="faq-section py-24 px-6 bg-[#181818] overflow-hidden">
        <div className="max-w-3xl mx-auto">
          
          <h2 className="faq-title opacity-0 text-4xl md:text-5xl font-serif text-center text-[#c2a353] mb-16 tracking-wide drop-shadow-sm">
            FAQ
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={`faq-item opacity-0 border transition-colors duration-300 rounded-lg overflow-hidden ${
                    isOpen ? 'border-[#c2a353] bg-[#c2a353]/5' : 'border-[#c2a353]/30 bg-transparent hover:border-[#c2a353]/60'
                  }`}
                >
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-white font-medium text-[15px] md:text-[16px] tracking-wide">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={20} 
                      strokeWidth={1.5}
                      className={`text-[#c2a353] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                    />
                  </button>
                  
                  {/* CSS Grid trick for smooth height animation */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 text-gray-400 text-[14px] leading-[1.8] font-light">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};

export default ValuesAndFAQ;