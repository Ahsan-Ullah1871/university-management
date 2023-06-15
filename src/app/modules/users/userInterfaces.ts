import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IUserRole } from '../../../interfaces/common'

export type IUser = {
  id: string
  role: IUserRole
  password: string
  student?: Types.ObjectId | IStudent
}

export type UserModel = Model<IUser, object>
