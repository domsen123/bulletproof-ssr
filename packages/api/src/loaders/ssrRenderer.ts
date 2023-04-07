import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import type { FastifyInstance } from 'fastify'
import type { RenderOptions, RenderResult } from '@bulletproof/shared'
import devalue from '@nuxt/devalue'
import { getConfig, isDev } from '../config'

export const loadSrrRenderer = async (fastify: FastifyInstance) => {
  const root = dirname(require.resolve('@bulletproof/app/index.html'))
  const clientRoot = resolve(root, 'dist/client')

  const indexProd = !isDev()
    ? readFileSync(resolve(clientRoot, 'index.html'), 'utf-8')
    : ''

  const manifest = !isDev()
    ? JSON.parse(readFileSync(resolve(clientRoot, 'ssr-manifest.json'), 'utf-8'))
    : {}

  let vite: any
  if (isDev()) {
    vite = await (await import('vite')).createServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    fastify.use(vite.middlewares)
  }
  else {
    await fastify.register(
      import('@fastify/compress'),
      { global: false },
    )

    await fastify.register((await import('@fastify/static')).default, {
      root: clientRoot,
      index: false,
      wildcard: true,
      decorateReply: true,
    })
  }

  fastify.use(async (req, res, next) => {
    const url = req.url as string

    // waiting for: https://github.com/fastify/middie/pull/180
    // const baseURL = `${req.protocol}://${req.hostname}`
    const { publicURL: baseURL } = getConfig()

    if (req.method !== 'GET' || url.startsWith('/api/') || url.startsWith('/assets/'))
      return next()

    let template: string
    let render: (renderOptions: RenderOptions) => Promise<RenderResult>

    try {
      if (isDev()) {
        template = readFileSync(require.resolve('@bulletproof/app/index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)

        // eslint-disable-next-line dot-notation
        render = (await vite.ssrLoadModule(require.resolve('@bulletproof/app/dev')))['default']
      }
      else {
        template = indexProd
        // @ts-expect-error no declaration files needed!
        render = (await import('@bulletproof/app/prod')).default
      }

      const { innerHtml, preloadedLinks, initialState } = await render({ url, manifest, baseURL, req })

      const inlineState = `  <script>window.__INITIAL_STATE__ = ${devalue(initialState)}</script>`

      const html = template
        .replace('<!--preload-links-->', preloadedLinks)
        .replace('<div id="app">', '<div id="app" class="server-rendered">')
        .replace('<!--app-html-->', innerHtml)
        .replace('</body>', `${inlineState}\n</body>`)

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      return res.end(html)
    }
    catch (e: any) {
      vite && vite.ssrFixStacktrace(e)
      fastify.log.error(e.stack)
      res.statusCode = 500
      return res.end(e.stack)
    }
  })
}
