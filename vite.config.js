import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access (0.0.0.0)
    port: process.env.PORT || 5173, // Use Render's dynamic port or default to 5173
  },
});
