import { Schema, model, Model } from 'mongoose'
import { IUser } from './usersInterface'

type UserModel = Model<IUser, object>

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export const User = model<IUser, UserModel>('User', userSchema)
