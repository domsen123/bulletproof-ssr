import type { FastifyInstance } from 'fastify'
import { isAuthenticated } from '../middlewares'

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/test',
    preHandler: [
      isAuthenticated,
    ],
    handler: async (req, res) => {
      return res.send({ user_id: req.user_id })
    },
  })
}
