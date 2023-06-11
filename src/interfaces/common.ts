import { generic_error_type } from './error'

export type modified_error_res_type = {
  status_code: number
  message: string
  errorMessages: generic_error_type[]
}

export type error_res_type = {
  success: boolean
  message: string
  errorMessages: generic_error_type[]
  stack?: string | undefined
}

export type IMeta = {
  page: number
  limit: number
  total: number
}

export type GenericResponse<T> = {
  meta: IMeta
  data: T
}
