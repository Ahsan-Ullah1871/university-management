import { z } from 'zod'

export const academic_faculty_zod_schema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
})

export const academic_faculty_update_zod_schema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
  }),
})
