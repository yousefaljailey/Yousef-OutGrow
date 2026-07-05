import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The Gemini key lives ONLY in the serverless environment (api/strategy.ts).
// Nothing secret is ever injected into the client bundle.
export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
