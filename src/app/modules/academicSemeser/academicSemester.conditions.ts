import { IAcademicSemesterSearch } from './academicSemester.interface'

export const filters_academic_conditions = (
  filers: IAcademicSemesterSearch
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
        {
          code: {
            $regex: search_key,
            $options: 'i',
          },
        },
        {
          $expr: {
            $eq: [{ $toString: '$year' }, search_key],
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
