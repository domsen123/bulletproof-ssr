import type { FastifyInstance, FastifyReply } from 'fastify'
import type { IAuth, IUser, SignInRequest } from '@bulletproof/shared'
import { getAuthService } from '../../locator'
import { isAuthenticated } from '../middlewares'
import { toReply } from '../../utils'

export default async (fastify: FastifyInstance) => {
  const sendAuthReply = (reply: FastifyReply, user: Omit<IUser, 'password'>, auth: IAuth) => {
    return reply
      .setCookie('access_token', auth.token, {
        path: '/',
        expires: auth.expire,
        httpOnly: true,
      })
      .send(toReply([user, auth]))
  }

  fastify.route<SignInRequest>({
    method: 'POST',
    url: '/auth/sign_in',
    handler: async (req, reply) => {
      try {
        const { mail, password } = req.body
        const authService = getAuthService()
        const [user, auth] = await authService.SignIn(mail, password)

        return sendAuthReply(reply, user, auth)
      }
      catch (e: any) {
        fastify.log.error('🔥 Error: %o', e)
        throw e
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
        else {
          const authService = getAuthService()
          const [user, auth] = await authService.SignInWithToken(req.token)
          return sendAuthReply(reply, user, auth)
        }
      }
      catch (e: any) {
        fastify.log.error('🔥 Error: %o', e)
        throw e
      }
    },
  })

  fastify.route({
    method: 'POST',
    url: '/auth/sign_out',
    handler: async (req, reply) => {
      return reply.clearCookie('access_token').send()
    },
  })
}
