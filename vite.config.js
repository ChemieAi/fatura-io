// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fatura-io/', // GitHub repo adın neyse onu yaz buraya
  plugins: [react()],
})
