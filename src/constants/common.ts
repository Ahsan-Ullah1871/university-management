import { IBloodGroup, IGender, IUserRole } from '../interfaces/common'

export const gender_list: IGender[] = ['male', 'female']

export const blood_groups: IBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]

export const user_roles: IUserRole[] = ['admin', 'student', 'faculty']
