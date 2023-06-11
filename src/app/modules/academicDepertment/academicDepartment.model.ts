import { Schema, model } from 'mongoose'

import ApiError from '../../errors/ApiError'
import status from 'http-status'
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepertment.interface'

// 2. Create a Schema corresponding to the document interface.
const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true },
    academic_faculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  })

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Already same Department created')
  } else {
    next()
  }
})

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema)
