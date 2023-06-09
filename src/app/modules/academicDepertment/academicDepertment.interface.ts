import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academic_faculty: Types.ObjectId | IAcademicFaculty
}

export type AcademicDepartmentModel = Model<IAcademicDepartment, object>

export type IAcademicDepartmentSearch = {
  search_key?: string
  title?: string
  academic_faculty?: Types.ObjectId
}
