import createFastify from 'fastify'
import { createLogger } from '@bulletproof/shared'
import { getConfig, isDev } from './config'
import { loadServer } from './loaders'

export const startServer = async () => {
  const fastify = createFastify({
    logger: createLogger(false, isDev()),
    disableRequestLogging: true,
  })

  await loadServer(fastify)

  try {
    const { host, port } = getConfig()
    await fastify.listen({
      host,
      port,
    })
  }
  catch (e: any) {
    fastify.log.error(e)
    process.exit(1)
  }
}
