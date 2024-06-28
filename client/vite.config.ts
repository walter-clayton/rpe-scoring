import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"  // Ensure the output directory is set to "dist"
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 5174,
  },
  optimizeDeps: {
    exclude: ["chunk-5YEU4UBX.js", "chunk-7FEHUSSR.js"]
  }
});
