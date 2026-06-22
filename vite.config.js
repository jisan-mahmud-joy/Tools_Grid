import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // এই লাইনে sitemap.xml এবং robots.txt ফাইলকে ক্যাশ ও রাউটিং থেকে এক্সক্লুড করা হয়েছে
      includeAssets: ['sitemap.xml', 'robots.txt', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'ToolGrid',
        short_name: 'ToolGrid',
        theme_color: '#000000',
        icons: []
      }
    })
  ]
})