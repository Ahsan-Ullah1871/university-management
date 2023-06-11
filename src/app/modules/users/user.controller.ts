import { Request, Response } from 'express'
import { UserServices } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const createUser = catchAsync(async (req: Request, res: Response) => {
  //
  const { user } = req.body
  const result = await UserServices.create_user(user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User created successfully',
  })
})

export const UserController = {
  createUser,
}
