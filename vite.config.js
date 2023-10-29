import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

console.log(process.env.IS_GH_PAGES);



// https://vitejs.dev/config/
export default defineConfig(
  {
  
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // base: '/local-weather-app/'
  
  base: process.env.IS_GH_PAGES ? '/local-weather-app/' : '/',
});
