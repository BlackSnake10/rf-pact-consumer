import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      VITE_SERVER_API_BASE_URL: 'http://localhost:4020',
    }),
  ],
})