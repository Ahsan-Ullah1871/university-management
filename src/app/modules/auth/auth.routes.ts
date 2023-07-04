import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  login_zod_schema,
  password_change_schema,
  refresh_token_zod_schema,
} from './auth.validation'
import { AuthController } from './auth.controller'
import authHandler from '../../middlewares/authHandler'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/login',
  requestValidationHandler(login_zod_schema),
  AuthController.loginUser
)
router.post(
  '/refresh-token',
  requestValidationHandler(refresh_token_zod_schema),
  AuthController.refreshToken
)
router.post(
  '/password-change',
  authHandler(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  requestValidationHandler(password_change_schema),
  AuthController.passwordChange
)

export const AuthRoute = router
