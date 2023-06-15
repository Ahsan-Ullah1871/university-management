import express from 'express'
// import { UserRoute } from '../app/modules/users/user.routes'
import { AcademicSemesterRoute } from '../app/modules/academicSemeser/academicSemester.routes'
import { AcademicFacultyRoute } from '../app/modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoute } from '../app/modules/academicDepertment/academicDepartment.routes'
import { StudentRoute } from '../app/modules/student/student.routes'

const router = express.Router()

const all_routes = [
  { path: '/students', router: StudentRoute },
  { path: '/academic-semesters', router: AcademicSemesterRoute },
  { path: '/academic-faculty', router: AcademicFacultyRoute },
  { path: '/academic-department', router: AcademicDepartmentRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
