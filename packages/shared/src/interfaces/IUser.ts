import type { IBase } from './IBase'

export interface IUserUnsaved {
  first_name?: string
  last_name?: string
  mail: string
  password?: string
  provider: 'local' | 'microsoft'
  identifier?: string
}

export interface IUserAppSafe extends Omit<IUser, 'password'> {}

export interface IUser extends IUserUnsaved, IBase {}
