import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './userInterfaces'
import { user_roles } from '../../../constants/common'

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true, enum: user_roles },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
  },
  { timestamps: true }
)

export const User = model<IUser, UserModel>('User', userSchema)
