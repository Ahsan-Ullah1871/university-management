import { IPagination } from '../../../interfaces/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { filters_academic_faculty_conditions } from './academicFaculty.conditions'
import {
  IAcademicFaculty,
  IAcademicFacultySearch,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import { pagination_map } from '../../../helpers/pagination'

// Create faculty
const create_academic_faculty = async (
  faculty_data: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const created_faculty = await AcademicFaculty.create(faculty_data)

  if (!created_faculty) {
    throw new Error('Failed to create new faculty')
  }

  return created_faculty
}

// Update faculty
const update_academic_faculty = async (
  faculty_data: Partial<IAcademicFaculty>,
  id: string
): Promise<IAcademicFaculty | null> => {
  const update_faculty = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    faculty_data,
    { new: true }
  )

  if (!update_faculty) {
    throw new Error('Failed to create new faculty')
  }

  return update_faculty
}

// Get faculties
const all_academic_faculties = async (
  filers: IAcademicFacultySearch,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IAcademicFaculty[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filters_academic_faculty_conditions(filers) ?? {}

  //
  const al_faculty = await AcademicFaculty.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: al_faculty,
  }
}

// Get single faculty
const single_academic_faculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  //
  const faculty = await AcademicFaculty.findById(id)

  return faculty
}

//Delete faculty
const delete_academic_faculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  //
  const faculty = await AcademicFaculty.findByIdAndDelete(id)

  return faculty
}

export const AcademicFacultyServices = {
  create_academic_faculty,
  all_academic_faculties,
  single_academic_faculty,
  update_academic_faculty,
  delete_academic_faculty,
}
