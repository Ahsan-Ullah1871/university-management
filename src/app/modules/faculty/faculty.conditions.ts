import { faculty_search_condition_keys } from './faculty.constant'
import { IFacultySearch } from './faculty.interface'

export const filters_faculty_conditions = (
  filers: IFacultySearch
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { search_key, ...filter_keys } = filers

  const conditions = []

  if (search_key) {
    conditions.push({
      $or: faculty_search_condition_keys.map(item => ({
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
