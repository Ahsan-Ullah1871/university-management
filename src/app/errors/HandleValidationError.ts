import mongoose from 'mongoose'
import { generic_error_type } from '../../interfaces/error'
import { error_res_type } from '../../interfaces/common'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): error_res_type => {
  const all_errors: generic_error_type[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: el?.path, message: el?.message }
    }
  )

  return {
    status_code: 400,
    message: 'Some values are missing',
    errorMessages: all_errors,
  }
}
