/* eslint-disable no-unused-expressions */

import httpStatus from 'http-status'
import { IUserRole } from '../../interfaces/common'
import ApiError from '../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Request, Response, NextFunction } from 'express'
import { Secret } from 'jsonwebtoken'

const authHandler =
  (...user_roles: IUserRole[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //   check authorization
      const token = req.headers?.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }

      const decoded_user = jwtHelpers.verifyToken(
        token,
        config.jwt.access_token_secret as Secret
      )

      //   check if the user is authenticated
      if (!decoded_user.id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }
      //
      req.user = decoded_user

      //   check if the user has the required role

      const decoded_user_role = decoded_user.role

      if (!decoded_user_role) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }

      if (!user_roles.includes(decoded_user_role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
export default authHandler
