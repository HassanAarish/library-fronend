/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "s-phone": "319px",
        "m-phone": "374px",
        phone: "429px",
        tablet: "767px",
        "laptop-sm": "900px",
        laptop: "1023px",
        desktop: "1439px",
        _4k: "1920px",
      },
      fontSize: {
        h1: "5.3125rem", // 85px
        h2: "4.6875rem", // 75px
        h3: "3.4375rem", // 55px
        h4: "2.625rem", // 42px
        h5: "2.375rem", // 38px
        h6: "1.875rem", // 30px
        body: "1.25rem", // 20px
        subheading: "1.5625rem", // 25px
        small: "1rem", // 16px
      },
      colors: {
        primary: "#127942",
        secondary: "#10B98",
        grey: "#8F8F8F",
        lightGreen: "#BCBCBC",
        borderGray: "#C2C2C2",
        primarySoft: "#12794299",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        vietnam: ["Be Vietnam Pro", "sans-serif"],
        proxima: ["Proxima Nova", "sans-serif"],
        glancyr: ["Glancyr", "sans-serif"],
      },
      backgroundImage: {
        buttongradient:
          "radial-gradient(50% 119.86% at 50% 50%, #00D06A 0%, #127942 100%)",
        "toast-gradient":
          "linear-gradient(86.36deg, #127942 3.39%, #00D06A 96.38%)",
      },
      animation: {
        marquee: "marquee 15s linear infinite",
        "slide-in": "slideIn 0.3s ease-out forwards",
        "slide-out": "slideOut 0.3s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
