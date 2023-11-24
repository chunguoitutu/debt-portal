import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    resolve: {
      alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react()],
    build: {
      outDir: './build',
    },
  }
})
