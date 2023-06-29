import { z } from 'zod'

export const academic_department_zod_schema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academic_faculty: z.string({
      required_error: 'academic faculty is required',
    }),
  }),
})

export const academic_department_update_zod_schema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    academic_faculty: z
      .string({
        required_error: 'academic faculty required',
      })
      .optional(),
  }),
})
