import type { EntryContext } from '@bulletproof/shared'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import createAxios from 'axios'
import { useAppStore } from '~/stores'

export class ApiService {
  private axios: AxiosInstance
  private store = useAppStore()

  constructor({ isClient, baseURL }: EntryContext) {
    this.axios = createAxios.create({
      baseURL,
      withCredentials: isClient,
    })

    this.axios.interceptors.request.use((config) => {
      console.log('auth', this.store.getCurrentAuth.value)
      return config
    })
  }

  public request = async <T = any>(config: AxiosRequestConfig) => {
    const store = useAppStore()

    const { data } = await this.axios.request(config)

    if (data && 'items' in data) {
      store.setItems(data.items)
      return data.items
    }
  }
}
