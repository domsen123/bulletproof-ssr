import type { IBase } from '../interfaces'

export interface AppNotification {
  type: 'info' | 'error' | 'warning'
  message: string
  timestamp: number
}

export interface AppState {
  currentUser: string | null
  currentAuth: string | null
  items: IBase[]
  notifications: AppNotification[]
}
