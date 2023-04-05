import get from 'lodash/get'
import { parseCookie } from '@bulletproof/shared'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import createAxios, { isAxiosError } from 'axios'
import { useAppStore } from '~/stores'

export class ApiService {
  private axios: AxiosInstance

  constructor(isClient: boolean, baseURL?: string, cookieString?: string) {
    useAppStore()
    this.axios = createAxios.create({
      baseURL,
      withCredentials: isClient,
      proxy: false,
    })

    this.axios.interceptors.response.use(response => Promise.resolve(response), (error) => {
      throw get(error, 'response.data', { error: 'Internal Server Error', message: 'Unknown Error.', statusCode: 500, stack: error })
    })

    if (!isClient && cookieString) {
      this.axios.interceptors.request.use((config) => {
        const access_token = parseCookie(cookieString, 'access_token')
        if (access_token)
          config.headers.set('Authorization', `Bearer ${access_token}`)

        return config
      })
    }
  }

  public request = async <T = any>(config: AxiosRequestConfig) => {
    const store = useAppStore()

    const { data: { items } } = await this.axios.request(config)
    store.setItems(items)

    return items
  }
}
