import crpyto from 'node:crypto'
import type { AppAuth, IAuth, IUser, IUserAppSafe } from '@bulletproof/shared'
import jwt from 'jsonwebtoken'
import { getTableName } from '../database/utils'
import { getDatabase } from '../database'
import { verifyString } from '../utils'
import { getConfig } from '../config'
import type { EventDispatcher } from '../events'
import { ApiError } from '../api/apiError'

export class AuthService {
  private db = getDatabase()

  constructor(private eventDispatcher: EventDispatcher) {}

  private generateTokenId = (token: string, expire: Date) => {
    return crpyto.createHash('md5').update(`${token}:${expire.getTime()}`).digest('hex')
  }

  private generateAuthInfo = (userRecord: IUser): IAuth => {
    const { secret } = getConfig()

    const today = new Date()
    const expire = new Date(today)
    expire.setDate(today.getDate() + 60)
    const exp = expire.getTime() / 1000

    const token = jwt.sign({
      id: userRecord.id,
      exp,
    }, secret)

    return {
      id: this.generateTokenId(token, expire),
      token,
      expire,
    }
  }

  private verifyToken = (token: string) => {
    const { secret } = getConfig()
    return jwt.verify(token, secret)
  }

  private toSafeUserRecord = (user: IUser): IUserAppSafe => {
    Reflect.deleteProperty(user, 'password')
    return user
  }

  public SignIn = async (mail: string, password: string): Promise<AppAuth> => {
    this.eventDispatcher.dispatch('before.sign_in', null)

    const userRecord = await this.db<IUser>(getTableName('users')).where({ mail }).first()
    if (!userRecord) throw new ApiError(404, 'User or password incorrect.')

    if (userRecord.provider === 'local' && userRecord.password) {
      const validPassword = await verifyString(password, userRecord.password)
      if (!validPassword) throw new ApiError(404, 'User or password incorrect.')
    }
    else {
      throw new ApiError(406, 'This provider is not implemented yet.')
    }

    const auth = this.generateAuthInfo(userRecord)

    const data: AppAuth = [this.toSafeUserRecord(userRecord), auth]

    this.eventDispatcher.dispatch('after.sign_in', data)

    return data
  }

  public SignInWithToken = async (access_token: string): Promise<AppAuth> => {
    const payload = this.verifyToken(access_token)
    if (!payload) throw new ApiError(403, 'Token can not be verified.')

    const { id: user_id, exp } = payload as { id: string; exp: number }

    const expire = new Date(exp * 1000)
    const userRecord = await this.db<IUser>(getTableName('users')).where({ id: user_id }).first()
    if (!userRecord) throw new ApiError(404, 'User not found.')

    const data: AppAuth = [
      this.toSafeUserRecord(userRecord),
      {
        id: this.generateTokenId(access_token, expire),
        token: access_token,
        expire,
      },
    ]

    return data
  }

  public SignOut = async (access_token: string): Promise<void> => {
  }
}
