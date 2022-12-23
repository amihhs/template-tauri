import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const envDir = resolve(__dirname, 'src/.env')

  return {
    envDir,
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      vue(),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),
      Components({
        dts: true,
        resolvers: [],
        dirs: ['./src/components'],
        extensions: ['vue'],
        // search for subdirectories
        deep: true,
        // Allow subdirectories as namespace prefix for components.
        directoryAsNamespace: true,
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
        exclude: ['**/components/*.vue'],
      }),
    ],
    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
      port: 5123,
      strictPort: true,
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      // Tauri supports es2021
      target: ['es2021', 'chrome100', 'safari13'],
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  }
})
