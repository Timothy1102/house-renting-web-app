import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); //to access .env variables starting with 'VITE_'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
