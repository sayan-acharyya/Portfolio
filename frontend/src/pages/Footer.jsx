import React from "react";
import { Phone, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-[#050B1E] border-t border-slate-900 mt-5">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-24">
        
        <div className="flex flex-col items-center justify-center text-center gap-6">
          
          {/* THE "SIGN OFF" */}
          <div className="space-y-2">
            <h1 className="text-white text-xl sm:text-2xl tracking-[10px] uppercase font-bold opacity-80">
              Thanks for <span className="text-emerald-400">Scrolling</span>
            </h1>
            <div className="w-12 h-1 bg-emerald-400 mx-auto rounded-full"></div>
          </div>

          {/* CONTACT PILLS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
            <a 
              href="tel:9832243680" 
              className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors duration-300 group"
            >
              <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-emerald-400/10 transition-colors">
                <Phone size={18} />
              </div>
              <span className="text-sm font-medium tracking-wider">9832243680</span>
            </a>
            
            <a 
              href="mailto:acharyyas735@gmail.com" 
              className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors duration-300 group"
            >
              <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-emerald-400/10 transition-colors">
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium tracking-wider">acharyyas735@gmail.com</span>
            </a>
          </div>

          {/* COPYRIGHT & CREDITS */}
          <div className="mt-8 pt-8 border-t border-slate-900 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} <span className="text-slate-300">Sayan Acharyya</span>
            </p>
            
            <p className="flex items-center gap-2 text-slate-500 text-xs tracking-widest uppercase">
              Built with <Heart size={12} className="text-emerald-500 fill-emerald-500 animate-pulse" /> using MERN
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;