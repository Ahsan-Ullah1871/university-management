/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemeser/academicSemester.model'
import { IUser } from '../users/userInterfaces'
import { IStudent, IStudentSearch } from './student.interface'
import { generate_student_id } from './student.utils'
import { Student } from './student.model'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import { IPagination } from '../../../interfaces/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { pagination_map } from '../../../helpers/pagination'
import { filters_students_conditions } from './student.conditions'

// Create student
const create_student = async (
  user_data: IUser,
  student: IStudent
): Promise<IUser | null> => {
  // default pass
  if (!user_data?.password) {
    user_data.password = config.default_student_password as string
  }

  // role
  if (!user_data.role) {
    user_data.role = 'student'
  }

  // Get academic semester
  const academic_semester_data = await AcademicSemester.findById(
    student.academicSemester
  )
  let createdNewUserData = null
  // Session Works
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // auto generated ID for student
    const student_id = await generate_student_id(academic_semester_data)
    user_data.id = student_id
    student.id = student_id

    const created_student = await Student.create([student], { session })

    if (!created_student.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new student')
    }
    user_data.student = created_student[0]._id

    const created_user = await User.create([user_data], { session })

    if (!created_user?.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create new student user'
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
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
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

// // Update Student
const update_student_faculty = async (
  student_data: Partial<IStudent>,
  id: string
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const { name, guardian, localGuardian, ...studentData } = student_data
  const updateStudentData: Partial<IStudent> = { ...studentData }
  // Dynamic handle

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const name_key = `name.${key}` as keyof Partial<IStudent>
      ;(updateStudentData as any)[name_key] = name[key as keyof typeof name]
    })
  }

  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach((key: string) => {
      const guardian_key = `guardian.${guardian}` as keyof Partial<IStudent>
      ;(updateStudentData as any)[guardian_key] =
        guardian[key as keyof typeof guardian]
    })
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach((key: string) => {
      const localGuardian_key =
        `localGuardian.${key}` as keyof Partial<IStudent>
      ;(updateStudentData as any)[localGuardian_key] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  console.log('====================================')
  console.log(updateStudentData)
  console.log('====================================')

  const update_student = await Student.findOneAndUpdate(
    { id },
    updateStudentData,
    { new: true }
  )

  if (!update_student) {
    throw new Error('Failed to update student')
  }

  return update_student
}

// Get faculties
const all_students = async (
  filers: IStudentSearch,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IStudent[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filters_students_conditions(filers) ?? {}

  //
  const all_students = await Student.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: all_students,
  }
}

// Get single Student
const single_student = async (id: string): Promise<IStudent | null> => {
  //
  const student = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')

  return student
}

export const StudentServices = {
  create_student,
  all_students,
  single_student,
  update_student_faculty,
}
