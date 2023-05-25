import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export const URL_BASE = 'http://0.0.0.0';
export const URL_API = `:8000`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
