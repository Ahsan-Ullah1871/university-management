import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //
    const { user } = req.body
    const result = await UserServices.create_user(user)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    //   message: 'Failed to create new user',
    // })

    next(err)
  }
}

export const UserController = {
  createUser,
}
