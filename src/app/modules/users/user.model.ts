import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './userInterfaces'
import { user_roles } from '../../../constants/common'
import bcrypt from 'bcrypt'
import config from '../../../config'

// 2. Create a Schema corresponding to the document interface.

// Note: IUserMethods need ti use when want to create method , connected with interface
const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true, enum: user_roles },
    password: { type: String, required: true, select: 0 },
    passwordChangedAt: { type: Date },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  },
  { timestamps: true }
)

//isUserExist  method

// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   return await User.findOne({ id }, { id: 1, password: 1 }).lean()
// }

//isUserExist  static method

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne({ id }).lean()
}

// //password check method
// userSchema.methods.isPasswordMatched = async function (
//   encrypted_pass: string,
//   given_pass: string
// ): Promise<boolean> {
//   return await bcrypt.compare(given_pass, encrypted_pass)
// }

//password check method
userSchema.statics.isPasswordMatched = async function (
  encrypted_pass: string,
  given_pass: string
): Promise<boolean> {
  return await bcrypt.compare(given_pass, encrypted_pass)
}

// pre
userSchema.pre('save', async function (next) {
  // Hashing the password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )

  this.passwordChangedAt = new Date()

  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
