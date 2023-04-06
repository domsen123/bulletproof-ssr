import type { LoggerOptions } from 'pino'
import pino from 'pino'

export const createLogger = (isClient: boolean, isDev: boolean) => {
  const options: LoggerOptions = {}

  if (isDev) {
    options.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    }
  }
  if (isClient) {
    options.browser = {
      write:
      {
        info: (o: any) => console.log(`[info] ${o.msg}`),
        warn: (o: any) => console.log(`[warn] ${o.msg}`),
        error: (o: any) => console.log(`[error] ${o.msg}`),
        fatal: (o: any) => console.log(`[fatal] ${o.msg}`),
        debug: (o: any) => console.log('[debug]', o),
        trace: (o: any) => console.log('[trace]', o),
      },
    }
  }

  return pino(options)
}
