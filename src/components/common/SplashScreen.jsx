import React from "react";
import Logo from "@/assets/logo.jpg";

const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center font-display overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Animated Outer Rings */}
        <div className="absolute w-32 h-32 border-4 border-primary/20 rounded-full animate-[ping_2s_infinite]"></div>
        <div className="absolute w-32 h-32 border-2 border-primary/10 rounded-full animate-[ping_3s_infinite]"></div>

        {/* Logo Container */}
        <div className="relative z-10 bg-[#1a1a1a] p-6 rounded-full border border-white/10 shadow-2xl animate-in zoom-in duration-700">
          <img
            src={Logo}
            alt="Library Logo"
            className="w-20 h-20 object-contain animate-[pulse_2s_infinite]"
          />
        </div>

        {/* Text Animation */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <h1 className="text-white text-2xl font-bold tracking-[0.3em] uppercase">
            Library <span className="text-primary">Hub</span>
          </h1>

          {/* Loading Bar */}
          <div className="mt-4 w-40 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-primary animate-[progress_2s_ease-in-out_infinite] w-full"></div>
          </div>

          <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-widest animate-pulse">
            Establishing Secure Connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
