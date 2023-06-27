import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  academic_faculty_update_zod_schema,
  academic_faculty_zod_schema,
} from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/create-faculty',
  authHandler('admin'),
  requestValidationHandler(academic_faculty_zod_schema),
  AcademicFacultyController.createAcademicFaculty
)

router.patch(
  '/:id',
  authHandler('admin'),
  requestValidationHandler(academic_faculty_update_zod_schema),

  AcademicFacultyController.updateAcademicFaculty
)
router.get(
  '/:id',
  authHandler('admin', 'faculty', 'student'),
  AcademicFacultyController.singleAcademicFaculty
)

router.delete(
  '/:id',
  authHandler('admin'),
  AcademicFacultyController.deleteAcademicFaculty
)

router.get(
  '/',
  authHandler('admin', 'faculty', 'student'),
  AcademicFacultyController.allAcademicFaculties
)

export const AcademicFacultyRoute = router
