import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { StudentServices } from './student.service'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constants/pagunation'
import { student_filter_keys } from './student.constant'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  //
  const { student, ...user_data } = req.body
  const result = await StudentServices.create_student(user_data, student)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student created successfully',
  })
})

// Update new Faculty
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  //
  const id = req.params.id
  const { ...student_data } = req.body
  const result = await StudentServices.update_student_faculty(student_data, id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student updated successfully',
  })
})

// Get All faculty
const allStudents = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, student_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await StudentServices.all_students(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result?.data,
    message: 'Students results',
  })
})

// // Get single Academic Faculty
const singleStudent = catchAsync(async (req: Request, res: Response) => {
  //

  const { id } = req.params

  const result = await StudentServices.single_student(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student result',
  })
})

export const StudentController = {
  createStudent,
  allStudents,
  singleStudent,
  updateStudent,
}
