import { EventDispatcher } from '../events'
import { AuthService } from '../services'

let __eventDispatcher: EventDispatcher | undefined
let __authService: AuthService | undefined

export const getEventDispatcher = () => {
  if (!__eventDispatcher) __eventDispatcher = new EventDispatcher()
  return __eventDispatcher
}

export const getAuthService = () => {
  if (!__authService) __authService = new AuthService(getEventDispatcher())
  return __authService
}
