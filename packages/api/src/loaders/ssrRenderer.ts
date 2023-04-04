import { readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { FastifyInstance } from 'fastify'
import type { RenderOptions, RenderResult } from '@bulletproof/shared'
import devalue from '@nuxt/devalue'

export const loadSrrRenderer = async (fastify: FastifyInstance) => {
  const vite = await (await import('vite')).createServer({
    root: dirname(require.resolve('@bulletproof/app/index.html')),
    server: { middlewareMode: true },
    appType: 'custom',
  })
  fastify.use(vite.middlewares)

  fastify.use(async (req, res, next) => {
    const url = req.url as string
    const baseURL = `${req.protocol}://${req.hostname}`

    if (req.method !== 'GET' || url.startsWith('/api/'))
      return next()

    let template: string
    let render: (renderOptions: RenderOptions) => Promise<RenderResult>

    try {
      const manifest = {}

      template = readFileSync(require.resolve('@bulletproof/app/index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      // eslint-disable-next-line dot-notation
      render = (await vite.ssrLoadModule(require.resolve('@bulletproof/app/dev')))['default']

      const { innerHtml, preloadedLinks, initialState } = await render({ url, manifest, baseURL, req })

      const inlineState = `  <script>window.__INITIAL_STATE__ = ${devalue(initialState)}</script>`

      const html = template
        .replace('<!--preload-links-->', preloadedLinks)
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
