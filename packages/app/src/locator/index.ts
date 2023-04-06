import type { EntryContext } from '@bulletproof/shared/*'
import { ApiService, AuthService } from '../services'

let __apiService: ApiService
let __authService: AuthService

export const setApiService = (ctx: EntryContext) => {
  __apiService = new ApiService(ctx)
}

export const getApiService = () => {
  return __apiService
}

export const getAuthService = () => {
  if (!__authService) __authService = new AuthService(getApiService())
  return __authService
}
