import type { FastifyInstance } from 'fastify'
import type { SignInRequest } from '@bulletproof/shared'
import { getAuthService } from '../../locator'
import { isAuthenticated } from '../middlewares'
import { toReply } from '../../utils'

export default async (fastify: FastifyInstance) => {
  fastify.route<SignInRequest>({
    method: 'POST',
    url: '/auth/sign_in',
    handler: async (req, reply) => {
      try {
        const { mail, password } = req.body
        const authService = getAuthService()
        const [user, auth] = await authService.SignIn(mail, password)
        const token = auth.token
        return reply
          .setCookie('access_token', token, {
            path: '/',
            expires: auth.expire,
            httpOnly: true,
          })
          .send(toReply([user, auth]))
      }
      catch (e: any) {
        fastify.log.error('🔥 Error: %o', e)
        reply.statusCode = 500
        return reply.send(e)
      }
    },
  })

  fastify.route({
    method: 'GET',
    url: '/auth/sign_in',
    preHandler: [isAuthenticated],
    handler: async (req, reply) => {
      try {
        if (!req.token) {
          reply.statusCode = 401
          return reply.send()
        }

        const authService = getAuthService()
        const [user, auth] = await authService.SignInWithToken(req.token)
        return reply
          .setCookie('access_token', req.token, {
            path: '/',
            expires: auth.expire,
            httpOnly: true,
          })
          .send(toReply([user, auth]))
      }
      catch (e: any) {
        fastify.log.error('🔥 Error: %o', e)
        reply.statusCode = 500
        return reply.send(e)
      }
    },
  })
}
