import { generic_error_type } from './error'

export type error_res_type = {
  status_code: number
  message: string
  errorMessages: generic_error_type[]
}
