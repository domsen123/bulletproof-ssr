import { useAppStore } from '../stores'
import type { ApiService } from './api.service'

export class AuthService {
  constructor(private apiService: ApiService) {}

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

  public AutoSignIn = async () => {
    try {
      const store = useAppStore()
      if (!store.$state.currentAuth || !store.$state.currentUser) {
        const response = await this.apiService.request({
          method: 'GET',
          url: '/api/auth/sign_in',
        })
        store.setAuth(response)
      }
    }
    catch (e: any) {
      console.log(e)
    }
  }
}
