import { Schema, model } from 'mongoose'
import { blood_groups, gender_list } from '../../../constants/common'
import { IStudent, StudentModel } from './student.interface'

export const StudentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: true },
    name: {
      required: true,
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String },
      },
    },
    gender: { type: String, required: true, enum: gender_list },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, required: true, enum: blood_groups },
    guardian: {
      required: true,
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String },
        motherContactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
    },
    localGuardian: {
      required: true,
      type: {
        name: { type: String, required: true },
        occupation: { type: String },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
    },
    academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Student = model<IStudent, StudentModel>('Student', StudentSchema)
