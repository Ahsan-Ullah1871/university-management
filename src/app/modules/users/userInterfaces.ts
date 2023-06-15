import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IUserRole } from '../../../interfaces/common'
import { IFaculty } from '../faculty/faculty.interface'

export type IUser = {
  id: string
  role: IUserRole
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
}

export type UserModel = Model<IUser, object>
