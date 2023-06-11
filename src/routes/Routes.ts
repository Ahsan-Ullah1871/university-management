import express from 'express'
import { UserRoute } from '../app/modules/users/user.routes'
import { AcademicSemesterRoute } from '../app/modules/academicSemeser/academicSemester.routes'
import { AcademicFacultyRoute } from '../app/modules/academicFaculty/academicFaculty.routes'

const router = express.Router()

const all_routes = [
  { path: '/users', router: UserRoute },
  { path: '/academic-semesters', router: AcademicSemesterRoute },
  { path: '/academic-faculty', router: AcademicFacultyRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
