import createFastify from 'fastify'
import { getConfig } from './config'
import { loadServer } from './loaders'

export const startServer = async () => {
  const fastify = createFastify({
    logger: true,
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
