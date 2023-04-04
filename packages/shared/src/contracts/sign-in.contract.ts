import type { IAuth, IUser } from '../interfaces'

export interface SignInRequestBody {
  mail: string
  password: string
}

export interface SignInRequest {
  Body: SignInRequestBody
}

export interface SignInResponse {
  items: [Omit<IUser, 'password'>, IAuth]
}
