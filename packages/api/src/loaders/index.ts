import { resolve } from 'node:path'
import type { FastifyInstance } from 'fastify'
import glob from 'glob'
import { loadDatabase } from '../database'
import loadRoutes from '../api/routes'
import { loadFastify } from './fastify'
import { loadSrrRenderer } from './ssrRenderer'

export const loadServer = async (fastify: FastifyInstance) => {
  fastify.log.info('👉 Loading Hooks')
  const hookFiles = await glob(resolve(__dirname, '../hooks/!(*.map)'))
  await Promise.all(hookFiles.map(h => import(h)))

  fastify.log.info('👉 Loading Database')
  await loadDatabase()

  fastify.log.info('👉 Extending Fastify')
  await loadFastify(fastify)

  fastify.log.info('👉 Setup Routes')
  await Promise.all(
    loadRoutes.map(route => fastify.register(route, { prefix: '/api' })),
  )

  fastify.log.info('👉 Setup SSR Renderer')
  await loadSrrRenderer(fastify)
}
