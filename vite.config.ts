// require('dotenv').config({ path: join(__dirname, '.env') })
import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

export default defineConfig(env => {
  return {
    plugins: [
      vue(),
    ],
    root: join(__dirname, 'src/renderer'),
    base: './',
    server: {
      port: pkg.env.PORT,
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src/renderer'),
        'src': join(__dirname, 'src'),
      },
    },
    build: {
      outDir: join(__dirname, 'dist/renderer'),
      emptyOutDir: true,
      minify: false,
      commonjsOptions: {},
      sourcemap: true,
    },
  }
})
