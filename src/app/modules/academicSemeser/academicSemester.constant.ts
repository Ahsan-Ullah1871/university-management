import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  IMonth,
} from './academicSemester.interface'

export const semester_months: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const semester_codes: IAcademicSemesterCode[] = ['01', '02', '03']
export const semester_titles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const semester_titles_code_mapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const academic_filter_keys = ['search_key', 'title', 'code', 'year']
