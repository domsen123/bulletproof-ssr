import type { IBase } from '@bulletproof/shared'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import createAxios from 'axios'
import { defineStore } from 'pinia'
import { parseCookie } from '../utils'
import type { AppState } from '../types'

export class ApiService {
  private axios: AxiosInstance

  constructor(isClient: boolean, baseURL?: string, cookieString?: string) {
    this.useStore()
    this.axios = createAxios.create({
      baseURL,
      withCredentials: isClient,
      proxy: false,
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

  public useStore = defineStore('app', {
    state: () => ({
      currentUser: null,
      currentAuth: null,
      items: [],
    }) as AppState,
    getters: {
      getItem: state => (id: string) => computed(() => state.items.find(item => item.id === id)),
      getCurrentUser: state => computed(() => state.items.find(item => item.id === state.currentUser)),
      getCurrentAuth: state => computed(() => state.items.find(item => item.id === state.currentAuth)),
    },
    actions: {
      setAuth(payload: [IBase, IBase]) {
        const [user, auth] = payload
        this.$state.currentUser = user.id
        this.$state.currentAuth = auth.id
      },
      setItem(data: IBase) {
        const index = this.$state.items.findIndex(item => item.id === data.id)
        if (index === -1)
          this.$state.items.push(data)
        else
          this.$state.items[index] = data
      },
      setItems(data: IBase[]) {
        data.forEach(d => this.setItem(d))
      },
    },
  })

  public request = async <T = any>(config: AxiosRequestConfig) => {
    const store = this.useStore()

    const { data: { items } } = await this.axios.request(config)
    store.setItems(items)

    return items
  }
}
