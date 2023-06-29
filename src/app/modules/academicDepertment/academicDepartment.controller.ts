import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constants/pagunation'
import { AcademicDepartmentServices } from './academicDepartment.service'
import { academic_department_filter_keys } from './academicDepartment.constant'

// Create new department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    //
    const { ...academic_department_data } = req.body
    const result = await AcademicDepartmentServices.create_academic_department(
      academic_department_data
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Department created successfully',
    })
  }
)
// Update new department
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    //
    const id = req.params.id
    const { ...academic_department_data } = req.body
    const result = await AcademicDepartmentServices.update_academic_department(
      academic_department_data,
      id
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Department updated successfully',
    })
  }
)

// Get All department
const allAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    //

    const filers = pick(req.query, academic_department_filter_keys)
    const pagination = pick(req.query, pagination_keys)

    const result = await AcademicDepartmentServices.all_academic_departments(
      filers,
      pagination
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      meta: result?.meta,
      data: result?.data,
      message: 'department results',
    })
  }
)

// Get single Academic department
const singleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    //

    const { id } = req.params

    const result = await AcademicDepartmentServices.single_academic_department(
      id
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'department result',
    })
  }
)

// Delete Academic department
const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    //

    const { id } = req.params

    const result = await AcademicDepartmentServices.delete_academic_department(
      id
    )

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'department deleted successfully',
    })
  }
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  allAcademicDepartments,
  singleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
