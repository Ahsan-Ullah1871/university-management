import { z } from 'zod'
import {
  semester_codes,
  semester_months,
  semester_titles,
} from './academicSemester.constant'

export const academic_semester_zod_schema = z.object({
  body: z.object({
    title: z.enum([...semester_titles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({ required_error: 'year is required' }),
    code: z.enum([...semester_codes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...semester_months] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...semester_months] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
})

export const academic_semester_update_zod_schema = z
  .object({
    body: z.object({
      title: z
        .enum([...semester_titles] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z.number({ required_error: 'year is required' }).optional(),
      code: z
        .enum([...semester_codes] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...semester_months] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...semester_months] as [string, ...string[]], {
          required_error: 'end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data?.body?.title && data?.body?.code) ||
      (!data.body.title && !data.body?.code),
    { message: 'Either both title & code should update or neither' }
  )
