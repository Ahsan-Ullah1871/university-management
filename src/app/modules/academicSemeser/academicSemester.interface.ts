import { Model } from 'mongoose'

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterCode = '01' | '02' | '03'
export type IMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemester = {
  title: IAcademicSemesterTitle
  year: number
  code: IAcademicSemesterCode
  startMonth: IMonth
  endMonth: IMonth
}

export type AcademicSemesterModel = Model<IAcademicSemester, object>

export type IAcademicSemesterSearch = {
  search_key?: string
  title?: string
  code?: string
  year?: number
}
