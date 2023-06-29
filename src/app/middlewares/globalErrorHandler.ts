/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { generic_error_type } from '../../interfaces/error'
import { handleValidationError } from '../errors/HandleValidationError'
import ApiError from '../errors/ApiError'
import { ZodError } from 'zod'
import HandleZodValidationError from '../errors/HandleZodValidationError'
import { handleCastError } from '../errors/HandleCastError'

const global_error_handler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'production'
    ? console.log(error)
    : console.log('HA HA HA ERROR', error)

  let status_code = 500
  let message = 'Something went wrong'
  let errorMessages: generic_error_type[] = []

  if (error?.name === 'ValidationError') {
    const validation_error = handleValidationError(error)
    status_code = validation_error.status_code
    message = validation_error.message
    errorMessages = validation_error.errorMessages
  } else if (error instanceof ZodError) {
    const z_validation_error = HandleZodValidationError(error)
    status_code = z_validation_error.status_code
    message = z_validation_error.message
    errorMessages = z_validation_error.errorMessages
  } else if (error?.name === 'CastError') {
    const cast_error = handleCastError(error)
    status_code = cast_error.status_code
    message = cast_error.message
    errorMessages = cast_error.errorMessages
  } else if (error instanceof ApiError) {
    status_code = error.statusCode
    message = 'Connection error'
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  } else if (error instanceof Error) {
    message = 'Internal error'
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  }
  res.status(status_code).json({
    success: false,
    message,
    errorMessages,
    stack: config?.node_env === 'development' ? error?.stack : undefined,
  })
  next()
}
export default global_error_handler
