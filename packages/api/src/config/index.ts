import { resolve } from 'node:path'
import type { Environment, ServerConfig } from '../types'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export const getEnv = (): Environment => {
  return process.env.NODE_ENV
}

export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

export const getConfig = (): ServerConfig => {
  const env: Record<Environment, string> = {
    development: '.dev',
    staging: '.stage',
    production: '',
  }

  // @ts-expect-error ...
  const envSlug = env[process.env.NODE_ENV]

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(resolve(process.cwd(), `config${envSlug}.js`)) as ServerConfig
}
