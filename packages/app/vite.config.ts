import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import Vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    UnoCSS(),
    Vuetify({
      autoImport: false,
      styles: { configFile: 'src/styles/settings.scss' },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
    }),
  ],
  optimizeDeps: {
    include: ['vuetify'],
  },
  ssr: {
    noExternal: [/^vuetify/],
  },
})
