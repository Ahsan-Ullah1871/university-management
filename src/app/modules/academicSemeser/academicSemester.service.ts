import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { semester_titles_code_mapper } from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterSearch,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPagination } from '../../../interfaces/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { pagination_map } from '../../../helpers/pagination'
import { filters_academic_conditions } from './academicSemester.conditions'

// Create semester
const create_academic_semester = async (
  semester_data: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (semester_titles_code_mapper[semester_data.title] !== semester_data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const created_semester = await AcademicSemester.create(semester_data)

  if (!created_semester) {
    throw new Error('Failed to create new semester')
  }

  return created_semester
}
// Create semester
const update_academic_semester = async (
  semester_data: Partial<IAcademicSemester>,
  id: string
): Promise<IAcademicSemester | null> => {
  if (
    semester_data?.title &&
    semester_data?.code &&
    semester_titles_code_mapper[semester_data.title] !== semester_data.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const update_semester = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    semester_data,
    { new: true }
  )

  if (!update_semester) {
    throw new Error('Failed to create new semester')
  }

  return update_semester
}

// Get semester
const all_academic_semester = async (
  filers: IAcademicSemesterSearch,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IAcademicSemester[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filters_academic_conditions(filers) ?? {}

  //
  const al_semester = await AcademicSemester.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: al_semester,
  }
}

// Get single semester
const single_academic_semester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  //
  const semester = await AcademicSemester.findById(id)

  return semester
}

// Get single semester
const delete_academic_semester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  //
  const semester = await AcademicSemester.findByIdAndDelete(id)

  return semester
}

export const AcademicSemesterServices = {
  create_academic_semester,
  all_academic_semester,
  single_academic_semester,
  update_academic_semester,
  delete_academic_semester,
}
