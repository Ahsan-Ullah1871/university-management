import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constants/pagunation'
import { AcademicFacultyServices } from './academicFaculty.service'
import { academic_faculty_filter_keys } from './academicFaculty.constant'

// Create new Faculty
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    //
    const { ...academic_faculty_data } = req.body
    const result = await AcademicFacultyServices.create_academic_faculty(
      academic_faculty_data
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Faculty created successfully',
    })
  }
)
// Update new Faculty
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    //
    const id = req.params.id
    const { ...academic_faculty_data } = req.body
    const result = await AcademicFacultyServices.update_academic_faculty(
      academic_faculty_data,
      id
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Faculty updated successfully',
    })
  }
)

// Get All faculty
const allAcademicFaculties = catchAsync(async (req: Request, res: Response) => {
  //

  const filers = pick(req.query, academic_faculty_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await AcademicFacultyServices.all_academic_faculties(
    filers,
    pagination
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result?.data,
    message: 'Faculty results',
  })
})

// Get single Academic Faculty
const singleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    //

    const { id } = req.params

    const result = await AcademicFacultyServices.single_academic_faculty(id)

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Faculty result',
    })
  }
)

// Delete Academic Faculty
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    //

    const { id } = req.params

    const result = await AcademicFacultyServices.delete_academic_faculty(id)

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Faculty deleted successfully',
    })
  }
)

export const AcademicFacultyController = {
  createAcademicFaculty,
  allAcademicFaculties,
  singleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
