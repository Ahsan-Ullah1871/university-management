import { z } from 'zod'

export const login_zod_schema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
})

export const refresh_token_zod_schema = z.object({
  cookies: z.object({
    refresh_token: z.string({ required_error: 'Refresh token is required' }),
  }),
})

export const password_change_schema = z.object({
  body: z.object({
    old_password: z.string({ required_error: 'Old password is required' }),
    new_password: z.string({ required_error: 'New password   is required' }),
  }),
})
