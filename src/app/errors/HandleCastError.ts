import mongoose from 'mongoose'
import { generic_error_type } from '../../interfaces/error'
import { modified_error_res_type } from '../../interfaces/common'
import httpStatus from 'http-status'

export const handleCastError = (
  err: mongoose.Error.CastError
): modified_error_res_type => {
  const all_errors: generic_error_type[] = [
    {
      path: err?.path,
      message: 'Invalid id sent',
    },
  ]

  return {
    status_code: httpStatus.FORBIDDEN,
    message: 'Invalid id',
    errorMessages: all_errors,
  }
}
