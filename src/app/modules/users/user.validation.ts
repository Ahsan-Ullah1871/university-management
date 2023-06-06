import { z } from 'zod'

export const create_user_zod_schema = z.object({
  body: z.object({
    role: z.string({ required_error: 'role is required' }),
    password: z.string().optional(),
  }),
})
