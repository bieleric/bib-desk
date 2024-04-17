import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    allowNodeBuiltins: ['__dirname'],
  },
  plugins: [vue()],
  base: "./",
  build: {
    outDir: "dist/vue"
  }
})
