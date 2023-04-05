import { build } from 'vite'

(async () => {
  await build({
    build: {
      emptyOutDir: true,
      outDir: 'dist/client',
      target: 'esnext',
      ssrManifest: true,
    },
  })

  await build({
    build: {
      emptyOutDir: true,
      outDir: 'dist/server',
      ssr: 'src/entry-server.ts',
      target: 'esnext',
    },
    ssr: {
      noExternal: [/^vuetify/],
    },
  })
})()
