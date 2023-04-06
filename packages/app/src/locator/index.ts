import type { EntryContext, Logger } from '@bulletproof/shared'
import { createLogger } from '@bulletproof/shared'
import { ApiService, AuthService } from '~/services'

let __apiService: ApiService
let __logger: Logger
let __authService: AuthService

export const bootServices = (ctx: EntryContext) => {
  __apiService = new ApiService(ctx)
  __logger = createLogger(ctx.isClient, import.meta.env.DEV)
  __logger.info('All Services ar booted')
}

export const getApiService = () => {
  return __apiService
}

export const getLoggingService = () => {
  return __logger
}

export const getAuthService = () => {
  if (!__authService) __authService = new AuthService(getApiService(), getLoggingService())
  return __authService
}
