/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../../config'
import { IUser } from '../users/userInterfaces'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import { IPagination } from '../../../interfaces/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { pagination_map } from '../../../helpers/pagination'
import { filters_faculty_conditions } from './faculty.conditions'
import { IFaculty, IFacultySearch } from './faculty.interface'
import { generate_faculty_id } from './faculty.utils'
import { Faculty } from './faculty.model'

// Create faculty
const create_faculty = async (
  user_data: IUser,
  faculty: IFaculty
): Promise<IUser | null> => {
  // default pass
  if (!user_data?.password) {
    user_data.password = config.default_faculty_password as string
  }

  // role
  if (!user_data.role) {
    user_data.role = 'faculty'
  }

  let createdNewUserData = null
  // Session Works
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // auto generated ID for faculty
    const faculty_id = await generate_faculty_id()
    user_data.id = faculty_id
    faculty.id = faculty_id

    const created_faculty = await Faculty.create([faculty], { session })

    if (!created_faculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new faculty')
    }

    user_data.faculty = created_faculty[0]._id

    const created_user = await User.create([user_data], { session })

    if (!created_user?.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create new faculty user'
      )
    }
    createdNewUserData = created_user[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    throw new ApiError(
      httpStatus.REQUEST_TIMEOUT,
      'Something is happening , try latter and  check fields'
    )
  }

  if (createdNewUserData) {
    createdNewUserData = await User.findOne({
      id: createdNewUserData.id,
    }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return createdNewUserData
}

// // Update Faculty
const update_faculty = async (
  faculty_data: Partial<IFaculty>,
  id: string
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'faculty not found')
  }

  const { name, ...facultyData } = faculty_data
  const updateFacultytData: Partial<IFaculty> = { ...facultyData }
  // Dynamic handle

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const name_key = `name.${key}` as keyof Partial<IFaculty>
      ;(updateFacultytData as any)[name_key] = name[key as keyof typeof name]
    })
  }

  const update_faculty = await Faculty.findOneAndUpdate(
    { id },
    updateFacultytData,
    { new: true }
  )

  if (!update_faculty) {
    throw new Error('Failed to update faculty')
  }

  return update_faculty
}

// Get faculties
const all_faculties = async (
  filers: IFacultySearch,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IFaculty[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filters_faculty_conditions(filers) ?? {}

  //
  const faculties = await Faculty.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
  const total = await Faculty.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: faculties,
  }
}

// // Get single Faculty
const single_faculty = async (id: string): Promise<IFaculty | null> => {
  //
  const faculty = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')

  return faculty
}

export const FacultyServices = {
  create_faculty,
  all_faculties,
  single_faculty,
  update_faculty,
}
