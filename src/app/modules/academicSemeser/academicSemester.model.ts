import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import {
  semester_codes,
  semester_months,
  semester_titles,
} from './academicSemester.constant'
import ApiError from '../../errors/ApiError'
import status from 'http-status'

// 2. Create a Schema corresponding to the document interface.
const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: { type: String, required: true, enum: semester_titles },
  year: { type: Number, required: true },
  code: { type: String, required: true, enum: semester_codes },
  startMonth: { type: String, required: true, enum: semester_months },
  endMonth: { type: String, required: true, enum: semester_months },
})

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Already same semester created')
  } else {
    next()
  }
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
