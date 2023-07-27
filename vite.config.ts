import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: './dist/types'
      // entry: './src/build-entry.ts'
    }),
    vueJsx(),
    VueSetupExtend()
  ],
  build: {
    minify: 'esbuild', // boolean | 'terser' | 'esbuild'
    lib: {
      entry: './src/build-entry.ts',
      name: 'emojiInput',
      fileName: 'emojiInput',
      formats: ['es', 'umd', 'cjs'] // 导出模块格式
    },
    rollupOptions: {
      external: ['vue'] //忽略打包vue文件
    }
  },
  esbuild: {
    drop: ['console', 'debugger'] // 清除console debuggers
  }
})
