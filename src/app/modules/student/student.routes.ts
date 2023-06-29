import express from 'express'
import { StudentController } from './student.controller'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  create_student_zod_schema,
  update_student_zod_schema,
} from './student.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/create-student',
  authHandler('admin'),
  requestValidationHandler(create_student_zod_schema),
  StudentController.createStudent
)

router.get(
  '/',
  authHandler('admin', 'faculty', 'student'),
  StudentController.allStudents
)

router.get(
  '/:id',
  authHandler('admin', 'faculty', 'student'),
  StudentController.singleStudent
)

router.patch(
  '/:id',
  authHandler('admin', 'faculty', 'student'),
  requestValidationHandler(update_student_zod_schema),
  StudentController.updateStudent
)

export const StudentRoute = router
