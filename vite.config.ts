import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    dts({
      entryRoot: './src/build-entry.ts',
      outDir: './dist/',
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    minify: 'esbuild', // boolean | 'terser' | 'esbuild'
    lib: {
      entry: './src/build-entry.ts',
      name: 'emojiInput',
      fileName: 'emojiInput',
      formats: ['es', 'umd'] // 导出模块格式
    },
    rollupOptions: {
      external: ['vue'] //忽略打包vue文件
    }
  },
  esbuild: {
    drop: ['console', 'debugger'] // 清除console debuggers
  }
})
