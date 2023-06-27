import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { login_zod_schema, refresh_token_zod_schema } from './auth.validation'
import { AuthController } from './auth.controller'

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

export const AuthRoute = router
