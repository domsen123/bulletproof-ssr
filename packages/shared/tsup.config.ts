import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/!(*.d).ts'],
  target: 'es2022',
  format: ['cjs', 'esm'],
  external: ['vue', 'vue-router'],
  dts: true,
  sourcemap: true,
  minify: false,
  bundle: false,
})
