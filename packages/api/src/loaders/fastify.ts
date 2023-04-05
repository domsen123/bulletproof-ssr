import type { FastifyInstance } from 'fastify'
import middie from '@fastify/middie'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { getConfig } from '../config'

export const loadFastify = async (fastify: FastifyInstance) => {
  const { key } = getConfig()
  await fastify.register(cors, {
    credentials: true,
    origin: (origin, cb) => {
      if (origin) {
        const { hostname } = new URL(origin)
        if (hostname === 'localhost')
          return cb(null, true)

        return cb(new Error('Not allowed'), false)
      }
    },
  })
  await fastify.register(cookie, { secret: key })
  await fastify.register(middie)
}
