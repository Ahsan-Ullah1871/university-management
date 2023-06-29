import { Schema, model } from 'mongoose'

import ApiError from '../../errors/ApiError'
import status from 'http-status'
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface'

// 2. Create a Schema corresponding to the document interface.
const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  })

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Already same Faculty created')
  } else {
    next()
  }
})

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
)
