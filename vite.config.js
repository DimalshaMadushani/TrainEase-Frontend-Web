import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  
  return {
    server: {
      proxy: {
        '/api': {
          target: 'https://trainease-backend.onrender.com',
          secure: false,
        },
      },
    },
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',
    },
  };
});
