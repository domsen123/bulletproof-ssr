import axios from 'axios'
import type { EntryContext } from '@bulletproof/shared/*'
import { useAppStore } from '../stores'
import type { ApiService } from './api.service'

export class AuthService {
  constructor(private apiService: ApiService) {}

  public isSignedIn = (): ComputedRef<boolean> => {
    const store = useAppStore()
    return computed(() => !!store.currentUser)
  }

  public static AutoSignIn = async ({ isClient, baseURL }: EntryContext, access_token?: string) => {
    const store = useAppStore()
    try {
      if (!store.$state.currentAuth) {
        const { data } = await axios({
          method: 'GET',
          url: '/api/auth/sign_in',
          baseURL,
          withCredentials: isClient,
          proxy: false,
          headers: access_token
            ? { Authorization: `Bearer ${access_token}` }
            : {},
        })
        if (data.items) {
          store.setAuth(data.items)
          store.setItems(data.items)
        }
      }
      console.log(`AutoSignIn Success: ${isClient ? 'Client' : 'Server'}`)
    }
    catch (e: any) {
      store.unsetAuth()
    }
  }

  public SignIn = async (mail: string, password: string) => {
    const store = useAppStore()
    try {
      const response = await this.apiService.request({
        method: 'POST',
        url: '/api/auth/sign_in',
        data: {
          mail,
          password,
        },
      })

      store.setAuth(response)
    }
    catch (e: any) {
      store.createNotification({
        type: 'error',
        message: e.message,
      })
      throw e
    }
  }

  public SignOut = async () => {
    const store = useAppStore()
    try {
      await this.apiService.request({
        method: 'POST',
        url: '/api/auth/sign_out',
      })
      store.unsetAuth()
    }
    catch (e: any) {
      store.createNotification({
        type: 'error',
        message: e.message,
      })
      throw e
    }
  }
}
