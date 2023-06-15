import { IPagination } from '../../../interfaces/pagination'
import { GenericResponse } from '../../../interfaces/common'

import { pagination_map } from '../../../helpers/pagination'
import {
  IAcademicDepartment,
  IAcademicDepartmentSearch,
} from './academicDepertment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { filters_academic_department_conditions } from './academicDepartment.conditions'

// Create department
const create_academic_department = async (
  department_data: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const created_department = await AcademicDepartment.create(department_data)

  if (!department_data) {
    throw new Error('Failed to create new department')
  }

  return created_department
}

// Update department
const update_academic_department = async (
  department_data: Partial<IAcademicDepartment>,
  id: string
): Promise<IAcademicDepartment | null> => {
  const update_department = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    department_data,
    { new: true }
  )

  if (!update_department) {
    throw new Error('Failed to update department')
  }

  return update_department
}

// Get faculties
const all_academic_departments = async (
  filers: IAcademicDepartmentSearch,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IAcademicDepartment[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filters_academic_department_conditions(filers) ?? {}

  //
  const al_department = await AcademicDepartment.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: al_department,
  }
}

// Get single department
const single_academic_department = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  //
  const department = await AcademicDepartment.findById(id).populate(
    'academic_faculty'
  )

  return department
}

//Delete department
const delete_academic_department = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  //
  const department = await AcademicDepartment.findByIdAndDelete(id)

  return department
}

export const AcademicDepartmentServices = {
  create_academic_department,
  all_academic_departments,
  single_academic_department,
  update_academic_department,
  delete_academic_department,
}
