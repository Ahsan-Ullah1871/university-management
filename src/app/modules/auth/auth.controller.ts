import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { AuthServices } from './auth.service'
import { ILoinResponse, IRefreshTokenResponse } from './auth.Interfaces'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  //
  const { ...login_data } = req.body
  const result = await AuthServices.user_login(login_data)

  const { refresh_token, ...othersData } = result

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refresh_token', refresh_token, options)

  sendResponse<ILoinResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: othersData,
    message: 'Logedin successfully',
  })
})

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  //
  const { refresh_token } = req.cookies
  const result = await AuthServices.refresh_token(refresh_token)

  sendResponse<IRefreshTokenResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'refresh successfully',
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
}
