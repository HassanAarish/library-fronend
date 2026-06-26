import { LuBookOpen } from "react-icons/lu";
import AuroraBackground from "@/components/common/AuroraBackground";

const SplashScreen = () => {
  return (
    <div className="relative min-h-screen overflow-hidden font-display">
      <AuroraBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Animated rings */}
          <div className="absolute h-32 w-32 rounded-full border-2 border-primary/20 animate-[ping_2s_infinite]" />
          <div className="absolute h-32 w-32 rounded-full border border-accent/10 animate-[ping_3s_infinite]" />

          {/* Logo */}
          <div className="relative z-10 grid h-24 w-24 place-items-center rounded-3xl glass-strong glow-primary animate-float">
            <span className="bg-aurora grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg">
              <LuBookOpen className="text-2xl" />
            </span>
          </div>

          {/* Text */}
          <div className="mt-9 text-center animate-rise">
            <h1 className="font-display text-2xl font-bold uppercase tracking-[0.3em] text-ink">
              Library<span className="text-gradient">Hub</span>
            </h1>

            <div className="mx-auto mt-5 h-1 w-44 overflow-hidden rounded-full bg-white/8">
              <div className="bg-aurora h-full w-full animate-[progress_1.8s_ease-in-out_infinite]" />
            </div>

            <p className="mt-3 text-[10px] uppercase tracking-widest text-faint animate-pulse">
              Establishing secure connection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
