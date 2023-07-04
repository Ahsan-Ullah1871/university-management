import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import {
  IChangePassword,
  ILogin,
  ILoinResponse,
  IRefreshTokenResponse,
} from './auth.Interfaces'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { JwtPayload, Secret } from 'jsonwebtoken'

const user_login = async (login_data: ILogin): Promise<ILoinResponse> => {
  const { id, password } = login_data

  // use rchecking
  //  user check
  const isUserExist = await User.findOne({ id }).select('+password')
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'User not exist')
  }

  const { password: user_encrypted_password, ...othersUserData } = isUserExist

  // match password;
  if (
    isUserExist &&
    user_encrypted_password &&
    !(await User.isPasswordMatched(user_encrypted_password, password))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
  }

  // access token
  const access_token = jwtHelpers.createToken(
    { id, role: othersUserData?.role },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )
  // refresh token
  const refresh_token = jwtHelpers.createToken(
    { id, role: othersUserData?.role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  return {
    user: othersUserData,
    access_token: access_token,
    refresh_token: refresh_token,
  }
}

const refresh_token = async (
  token: string
): Promise<IRefreshTokenResponse | null> => {
  //  token verification
  let decoded_token = null
  try {
    decoded_token = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    )
  } catch (err) {
    // err
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
  }

  // user checking verification
  const { id } = decoded_token
  const user = await User.isUserExist(id)
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
  }

  // access token
  const access_token = jwtHelpers.createToken(
    { id, role: user?.role },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )

  return {
    access_token,
  }
}

const password_change = async (
  password_data: IChangePassword,
  user: JwtPayload
): Promise<void> => {
  //  user check
  const isUserExist = await User.findOne({ id: user?.id }).select('+password')
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'User not exist')
  }

  // old password check
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(
      isUserExist.password,
      password_data.old_password
    ))
  ) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Old password is wrong')
  }

  isUserExist.password = password_data.new_password
  isUserExist.save()
}

export const AuthServices = {
  user_login,
  refresh_token,
  password_change,
}
