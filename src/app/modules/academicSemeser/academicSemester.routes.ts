import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  academic_semester_update_zod_schema,
  academic_semester_zod_schema,
} from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  requestValidationHandler(academic_semester_zod_schema),
  AcademicSemesterController.createAcademicSemester
)

router.patch(
  '/:id',
  requestValidationHandler(academic_semester_update_zod_schema),
  AcademicSemesterController.updateAcademicSemester
)
router.get('/:id', AcademicSemesterController.singleAcademicSemester)

router.delete('/:id', AcademicSemesterController.deleteAcademicSemester)

router.get('/', AcademicSemesterController.allAcademicSemesters)

export const AcademicSemesterRoute = router
