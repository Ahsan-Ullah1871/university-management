import { Model } from 'mongoose'

export type IAcademicFaculty = {
  title: string
}

export type AcademicFacultyModel = Model<IAcademicFaculty, object>

export type IAcademicFacultySearch = {
  search_key?: string
  title?: string
}
