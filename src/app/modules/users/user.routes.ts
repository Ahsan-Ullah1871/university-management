import express from 'express'
import { UserController } from './user.controller'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { create_user_zod_schema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  requestValidationHandler(create_user_zod_schema),
  UserController.createUser
)

export const UserRoute = router
