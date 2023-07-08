import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom']
                }
            }
        }
    },
    plugins: [
        svgr(), react()
    ]
})
