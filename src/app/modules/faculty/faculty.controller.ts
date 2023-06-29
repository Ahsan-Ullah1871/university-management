import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constants/pagunation'
import { faculty_filter_keys } from './faculty.constant'
import { FacultyServices } from './faculty.service'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  //
  const { faculty, ...user_data } = req.body
  const result = await FacultyServices.create_faculty(user_data, faculty)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Faculty created successfully',
  })
})

// // Update new Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  //
  const id = req.params.id
  const { ...faculty_data } = req.body
  const result = await FacultyServices.update_faculty(faculty_data, id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Faculty updated successfully',
  })
})

// Get All faculty
const allFaculties = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, faculty_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await FacultyServices.all_faculties(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result?.data,
    message: 'Faculties results',
  })
})

// // // Get single Academic Faculty
const singleFaculty = catchAsync(async (req: Request, res: Response) => {
  //

  const { id } = req.params

  const result = await FacultyServices.single_faculty(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Faculty result',
  })
})

export const FacultyController = {
  createFaculty,
  allFaculties,
  singleFaculty,
  updateFaculty,
}
