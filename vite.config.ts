import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/context": path.resolve(__dirname, "./src/contexts"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/layout": path.resolve(__dirname, "./src/layout"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
    },
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
