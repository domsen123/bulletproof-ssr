import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/!(*.d).ts'],
  target: 'es2022',
  format: ['cjs'],
  clean: true,
  noExternal: ['@bulletproof/app'],
  external: ['esbuild', 'vite', '@bulletproof/shared'],
  sourcemap: true,
  minify: false,
  bundle: false,
})
