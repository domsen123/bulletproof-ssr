import type { IBase } from './IBase'

export interface IRoleUnsaved {
  name: string
  description?: string
  admin_access: boolean
}

export interface IRole extends IRoleUnsaved, IBase {}
