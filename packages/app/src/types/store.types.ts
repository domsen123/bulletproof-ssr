import type { IAuth, IBase } from '@bulletproof/shared'

export interface StateItem {
  key: string
  data: IBase | IBase[]
}

export interface AppState {
  currentUser: string | null
  currentAuth: string | null
  items: IBase[]
}
