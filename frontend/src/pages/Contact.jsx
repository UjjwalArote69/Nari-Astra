import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const comp = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out. Our concierge team will contact you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Page Header Animation (Loads immediately)
      gsap.fromTo(".contact-header",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.1 }
      );

      // 2. Contact Grid Animation (Left Info & Right Form)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%", // Triggers when the top of the grid hits 80% viewport height
          toggleActions: "play none none none"
        }
      });

      // Left Side: Stagger the contact info items from the left
      tl.fromTo(".contact-info-item",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
      // Right Side: Form container slides up
      .fromTo(".contact-form-wrapper",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6" // Overlap with the left side animation
      )
      // Inside Form: Stagger the inputs slightly
      .fromTo(".form-el",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      );

    }, comp);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={comp} className="bg-[#05080f] min-h-screen pt-32 pb-24 font-sans text-gray-200 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#c2a353]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c2a353]/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {/* 1. Page Header */}
      <section className="px-6 md:px-12 max-w-[900px] mx-auto text-center mb-20 relative z-10">
        <h2 className="contact-header opacity-0 text-[#c2a353] text-[12px] uppercase tracking-[0.3em] font-medium mb-6">
          Concierge & Support
        </h2>
        <h1 className="contact-header opacity-0 text-5xl md:text-7xl font-serif text-[#e4cc76] mb-8 tracking-wide drop-shadow-sm">
          Get in Touch
        </h1>
        <p className="contact-header opacity-0 text-gray-400 text-[16px] md:text-[18px] leading-[1.8] font-light max-w-2xl mx-auto">
          Whether you have a question about our formula, shipping logistics, or wholesale inquiries, our dedicated team is here to assist you with complete discretion.
        </p>
      </section>

      {/* 2. Contact Grid (Info & Form) */}
      <section className="contact-grid px-6 md:px-12 max-w-[1200px] mx-auto z-10 relative">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">
          
          {/* Left: Contact Information */}
          <div className="flex flex-col space-y-12">
            <div>
              <h3 className="contact-info-item opacity-0 text-3xl font-serif text-white mb-8 tracking-wide">
                Direct Channels
              </h3>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="contact-info-item opacity-0 flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#c2a353]/50 group-hover:bg-[#c2a353]/10 transition-all duration-300">
                    <Mail className="text-[#c2a353]" size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-white text-[14px] uppercase tracking-widest mb-1.5 font-medium">Email Us</h4>
                    <a href="mailto:concierge@nariastra.com" className="text-gray-400 text-[15px] font-light hover:text-[#c2a353] transition-colors">
                      concierge@nariastra.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-info-item opacity-0 flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#c2a353]/50 group-hover:bg-[#c2a353]/10 transition-all duration-300">
                    <Phone className="text-[#c2a353]" size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-white text-[14px] uppercase tracking-widest mb-1.5 font-medium">Call Us</h4>
                    <a href="tel:+18005550199" className="text-gray-400 text-[15px] font-light hover:text-[#c2a353] transition-colors">
                      +1 (800) 555-0199
                    </a>
                  </div>
                </div>

                {/* HQ Address */}
                <div className="contact-info-item opacity-0 flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#c2a353]/50 group-hover:bg-[#c2a353]/10 transition-all duration-300">
                    <MapPin className="text-[#c2a353]" size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-white text-[14px] uppercase tracking-widest mb-1.5 font-medium">Headquarters</h4>
                    <p className="text-gray-400 text-[15px] font-light leading-relaxed">
                      124 Luxury Avenue, Suite 400<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="contact-info-item opacity-0 flex items-start gap-5 group pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full border border-transparent flex items-center justify-center shrink-0">
                    <Clock className="text-gray-500" size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-white text-[14px] uppercase tracking-widest mb-1.5 font-medium">Operating Hours</h4>
                    <p className="text-gray-400 text-[15px] font-light leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM (IST)<br />
                      Saturday & Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-form-wrapper opacity-0 bg-[#0a0f1c] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative">
            <h3 className="form-el opacity-0 text-2xl font-serif text-[#e4cc76] mb-8 tracking-wide">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="form-el opacity-0 space-y-2">
                  <label htmlFor="name" className="text-gray-400 text-[12px] uppercase tracking-widest ml-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#05080f] border border-white/10 rounded-xl px-5 py-4 text-white text-[15px] font-light focus:outline-none focus:border-[#c2a353]/50 focus:bg-[#c2a353]/5 transition-all duration-300"
                    placeholder="Jane Doe"
                  />
                </div>
                
                {/* Email */}
                <div className="form-el opacity-0 space-y-2">
                  <label htmlFor="email" className="text-gray-400 text-[12px] uppercase tracking-widest ml-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#05080f] border border-white/10 rounded-xl px-5 py-4 text-white text-[15px] font-light focus:outline-none focus:border-[#c2a353]/50 focus:bg-[#c2a353]/5 transition-all duration-300"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-el opacity-0 space-y-2">
                <label htmlFor="subject" className="text-gray-400 text-[12px] uppercase tracking-widest ml-2">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#05080f] border border-white/10 rounded-xl px-5 py-4 text-white text-[15px] font-light focus:outline-none focus:border-[#c2a353]/50 focus:bg-[#c2a353]/5 transition-all duration-300"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div className="form-el opacity-0 space-y-2">
                <label htmlFor="message" className="text-gray-400 text-[12px] uppercase tracking-widest ml-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-[#05080f] border border-white/10 rounded-xl px-5 py-4 text-white text-[15px] font-light focus:outline-none focus:border-[#c2a353]/50 focus:bg-[#c2a353]/5 transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-el opacity-0 pt-4">
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-[#e8cf9c] via-[#c4a154] to-[#99762a] text-[#111] font-bold text-[13px] py-4 px-10 rounded-full uppercase tracking-[0.15em] transition-all shadow-[0_0_30px_rgba(196,161,84,0.3)] hover:shadow-[0_0_50px_rgba(196,161,84,0.6)] flex items-center justify-center gap-3 hover:scale-[1.02]"
                >
                  <Send size={18} strokeWidth={2} />
                  Send Message
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;