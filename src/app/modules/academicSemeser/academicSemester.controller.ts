import { Request, Response } from 'express'
import { AcademicSemesterServices } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constants/pagunation'
import { academic_filter_keys } from './academicSemester.constant'

// Create new Semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    //
    const { ...academic_semester_data } = req.body
    const result = await AcademicSemesterServices.create_academic_semester(
      academic_semester_data
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Semester created successfully',
    })
  }
)
// Update new Semester
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    //
    const id = req.params.id
    const { ...academic_semester_data } = req.body
    const result = await AcademicSemesterServices.update_academic_semester(
      academic_semester_data,
      id
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Semester updated successfully',
    })
  }
)

// Get All semester
const allAcademicSemesters = catchAsync(async (req: Request, res: Response) => {
  //

  const filers = pick(req.query, academic_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await AcademicSemesterServices.all_academic_semester(
    filers,
    pagination
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    meta: result?.meta,
    data: result?.data,
    message: 'Semester results',
  })
})

// Get single Academic Semester
const singleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    //

    const { id } = req.params

    const result = await AcademicSemesterServices.single_academic_semester(id)

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Semester results',
    })
  }
)

// Delete Academic Semester
const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    //

    const { id } = req.params

    const result = await AcademicSemesterServices.delete_academic_semester(id)

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Semester deleted successfully',
    })
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  allAcademicSemesters,
  singleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
}
