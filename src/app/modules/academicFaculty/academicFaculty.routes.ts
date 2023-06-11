import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  academic_faculty_update_zod_schema,
  academic_faculty_zod_schema,
} from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  requestValidationHandler(academic_faculty_zod_schema),
  AcademicFacultyController.createAcademicFaculty
)

router.patch(
  '/:id',
  requestValidationHandler(academic_faculty_update_zod_schema),
  AcademicFacultyController.updateAcademicFaculty
)
router.get('/:id', AcademicFacultyController.singleAcademicFaculty)

router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty)

router.get('/', AcademicFacultyController.allAcademicFaculties)

export const AcademicFacultyRoute = router
