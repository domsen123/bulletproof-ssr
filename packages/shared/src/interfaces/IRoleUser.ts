import type { IBase } from './IBase'

export interface IRoleUserUnsaved {
  role_id: string
  user_id: string
}

export interface IRoleUser extends IRoleUserUnsaved, IBase {}
