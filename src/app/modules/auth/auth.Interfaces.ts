import { IUser } from '../users/userInterfaces'

export type ILogin = {
  id: string
  password: string
}

export type ILoinResponse = {
  user: Partial<IUser>
  access_token: string
  refresh_token?: string
}
export type IRefreshTokenResponse = {
  access_token: string
}
