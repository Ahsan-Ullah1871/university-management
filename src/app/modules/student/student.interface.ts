import { Model, Types } from 'mongoose'
import { IBloodGroup, IGender } from '../../../interfaces/common'
import { IAcademicSemester } from '../academicSemeser/academicSemester.interface'
import { IAcademicDepartment } from '../academicDepertment/academicDepertment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

type Name = {
  firstName: string
  middleName?: string
  lastName?: string
}

type Guardian = {
  fatherName: string
  fatherOccupation?: string
  fatherContactNo: string
  motherName: string
  motherOccupation?: string
  motherContactNo: string
  address: string
}

type LocalGuardian = {
  name: string
  occupation?: string
  contactNo: string
  address: string
}

// IStudent
export type IStudent = {
  id: string
  name: Name
  gender: IGender
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup: IBloodGroup
  guardian: Guardian
  localGuardian: LocalGuardian
  academicSemester: Types.ObjectId | IAcademicSemester
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type StudentModel = Model<IStudent, object>

export type IStudentSearch = {
  search_key?: string
  id?: string
  gender?: string
  dateOfBirth?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
