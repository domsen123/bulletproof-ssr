import type { IAuth, IUserAppSafe } from '../interfaces'

export interface SignInRequestBody {
  mail: string
  password: string
}

export interface SignInRequest {
  Body: SignInRequestBody
}

export interface SignInResponse {
  items: [IUserAppSafe, IAuth]
}

export type AppAuth = [IUserAppSafe, IAuth]
