import { student_search_condition_keys } from './student.constant'
import { IStudentSearch } from './student.interface'

export const filters_students_conditions = (
  filers: IStudentSearch
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { search_key, ...filter_keys } = filers

  const conditions = []

  if (search_key) {
    conditions.push({
      $or: student_search_condition_keys.map(item => ({
        [item]: {
          $regex: search_key,
          $options: 'i',
        },
      })),
    })
  }

  //
  if (Object.keys(filter_keys).length) {
    conditions.push({
      $and: Object.entries(filter_keys).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  return conditions?.length > 0 ? { $and: conditions } : undefined
}
