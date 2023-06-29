import { z } from 'zod'
import { blood_groups, gender_list } from '../../../constants/common'

export const create_faculty_zod_schema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      }),
      gender: z.enum([...gender_list] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      designation: z.string({
        required_error: 'Designation address is required',
      }),
      bloodGroup: z.enum([...blood_groups] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),

      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
})

export const update_faculty_zod_schema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({ required_error: 'First name is required' })
          .optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z
      .enum([...gender_list] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .optional(),
    email: z.string({ required_error: 'Email is required' }).email().optional(),
    contactNo: z
      .string({ required_error: 'Contact number is required' })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency contact number is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
    bloodGroup: z
      .enum([...blood_groups] as [string, ...string[]], {
        required_error: 'Blood group is required',
      })
      .optional(),

    academicSemester: z
      .string({
        required_error: 'Academic semester is required',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .optional(),
    academicDepartment: z
      .string({
        required_error: 'Academic department is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
})
