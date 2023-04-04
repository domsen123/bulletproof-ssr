import { ApiService, AuthService } from '../services'

let __apiService: ApiService
let __authService: AuthService

export const setApiService = (isClient: boolean, baseURL?: string, cookieString?: string) => {
  __apiService = new ApiService(isClient, baseURL, cookieString)
}

export const getApiService = () => {
  return __apiService
}

export const getAuthService = () => {
  if (!__authService) __authService = new AuthService(getApiService())
  return __authService
}
