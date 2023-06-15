import { Model, Types } from 'mongoose'
import { IBloodGroup, IGender } from '../../../interfaces/common'
import { IAcademicDepartment } from '../academicDepertment/academicDepertment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

type Name = {
  firstName: string
  middleName?: string
  lastName?: string
}

// IStudent
export type IFaculty = {
  id: string
  name: Name
  gender: IGender
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  designation: string
  profileImage?: string
  bloodGroup: IBloodGroup
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type FacultyModel = Model<IFaculty, object>

export type IFacultySearch = {
  search_key?: string
  id?: string
  gender?: string
  dateOfBirth?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
