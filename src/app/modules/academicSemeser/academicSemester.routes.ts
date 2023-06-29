import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  academic_semester_update_zod_schema,
  academic_semester_zod_schema,
} from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/create-semester',
  authHandler('admin'),

  requestValidationHandler(academic_semester_zod_schema),
  AcademicSemesterController.createAcademicSemester
)

router.patch(
  '/:id',
  authHandler('admin'),
  requestValidationHandler(academic_semester_update_zod_schema),
  AcademicSemesterController.updateAcademicSemester
)
router.get(
  '/:id',
  authHandler('admin', 'faculty', 'student'),
  AcademicSemesterController.singleAcademicSemester
)

router.delete(
  '/:id',
  authHandler('admin'),
  AcademicSemesterController.deleteAcademicSemester
)

router.get(
  '/',
  authHandler('admin', 'faculty', 'student'),
  AcademicSemesterController.allAcademicSemesters
)

export const AcademicSemesterRoute = router
