import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { FacultyController } from './faculty.controller'
import {
  create_faculty_zod_schema,
  update_faculty_zod_schema,
} from './faculty.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/create-faculty',
  authHandler('admin', 'faculty', 'student'),
  requestValidationHandler(create_faculty_zod_schema),
  FacultyController.createFaculty
)

router.get(
  '/',
  authHandler('admin', 'faculty', 'student'),
  FacultyController.allFaculties
)

router.get(
  '/:id',
  authHandler('admin', 'faculty', 'student'),
  FacultyController.singleFaculty
)

router.patch(
  '/:id',
  authHandler('admin', 'faculty'),
  requestValidationHandler(update_faculty_zod_schema),
  FacultyController.updateFaculty
)

export const FacultyRoute = router
