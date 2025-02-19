import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        withCredentials: true, // Add this
        cookieDomainRewrite: "localhost", // Simplify this
      },
    },
  },
  plugins: [react()],
});
