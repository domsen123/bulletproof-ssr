import type { FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import get from 'lodash/get'
import { getConfig } from '../../config'

export const isAuthenticated = async (req: FastifyRequest) => {
  let token: string | undefined

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    token = req.headers.authorization.split(' ')[1]

  if (!token && get(req.cookies, 'access_token'))
    token = get(req.cookies, 'access_token')

  if (!token && get(req.query, 'access_token'))
    token = get(req.query, 'access_token')

  if (token) {
    const { secret } = getConfig()
    try {
      const decoded: any = jwt.verify(token, secret)
      req.user_id = decoded.id
      req.token = token
    }
    catch (e: any) {}
  }
}
