import { IAcademicDepartmentSearch } from './academicDepertment.interface'

export const filters_academic_department_conditions = (
  filers: IAcademicDepartmentSearch
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { search_key, ...filter_keys } = filers

  const conditions = []

  if (search_key) {
    conditions.push({
      $or: [
        {
          title: {
            $regex: search_key,
            $options: 'i',
          },
        },
      ],
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
