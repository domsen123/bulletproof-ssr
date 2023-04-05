import type { FastifyInstance } from 'fastify'
import middie from '@fastify/middie'
import cookie from '@fastify/cookie'
import { getConfig } from '../config'

export const loadFastify = async (fastify: FastifyInstance) => {
  const { key } = getConfig()
  await fastify.register(cookie, { secret: key })
  await fastify.register(middie)
}
