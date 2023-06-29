import { generic_error_type } from '../../interfaces/error'
import { modified_error_res_type } from '../../interfaces/common'
import { ZodError, ZodIssue } from 'zod'

const HandleZodValidationError = (error: ZodError): modified_error_res_type => {
  const all_errors: generic_error_type[] = error.issues.map((el: ZodIssue) => {
    return { path: el?.path[el?.path?.length - 1], message: el?.message }
  })

  return {
    status_code: 400,
    message: 'Validation error',
    errorMessages: all_errors,
  }
}

export default HandleZodValidationError
