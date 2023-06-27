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

// Method practice
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>
//   isPasswordMatched(
//     encrypted_pass: string,
//     given_pass: string
//   ): Promise<boolean>
// }

// export type UserModel = Model<IUser, object, IUserMethods>

export type UserModel = {
  isUserExist(id: string): Promise<IUser | null>
  isPasswordMatched(
    encrypted_pass: string,
    given_pass: string
  ): Promise<boolean>
} & Model<IUser>
