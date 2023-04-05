import type { AppNotification, AppState, IAuth, IBase, IUserAppSafe } from '@bulletproof/shared'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: null,
    currentAuth: null,
    items: [],
    notifications: [],
  }) as AppState,
  getters: {
    getItem: state => (id: string) => computed(() => state.items.find(item => item.id === id)),
    getCurrentUser: state => computed(() => state.items.find(item => item.id === state.currentUser)),
    getCurrentAuth: state => computed(() => state.items.find(item => item.id === state.currentAuth)),
    getNotifications: state => computed(() => state.notifications.slice().sort((a, b) => a.timestamp - b.timestamp)),
  },
  actions: {
    setAuth(payload: [IUserAppSafe, IAuth]) {
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
    createNotification(notification: Omit<AppNotification, 'timestamp'>) {
      this.$state.notifications.push({
        ...notification,
        timestamp: new Date().getTime(),
      })
    },
  },
})
