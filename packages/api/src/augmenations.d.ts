
import FastifyRequest from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user_id?: string
    token?: string
  }
}

export {}