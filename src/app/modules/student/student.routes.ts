import express from 'express'
import { StudentController } from './student.controller'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  create_student_zod_schema,
  update_student_zod_schema,
} from './student.validation'

const router = express.Router()

router.post(
  '/create-student',
  requestValidationHandler(create_student_zod_schema),
  StudentController.createStudent
)

router.get('/', StudentController.allStudents)

router.get('/:id', StudentController.singleStudent)

router.patch(
  '/:id',
  requestValidationHandler(update_student_zod_schema),
  StudentController.updateStudent
)

export const StudentRoute = router
