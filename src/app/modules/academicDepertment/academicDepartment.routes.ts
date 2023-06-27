import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { AcademicDepartmentController } from './academicDepartment.controller'
import {
  academic_department_update_zod_schema,
  academic_department_zod_schema,
} from './academicDepertment.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/create-department',
  authHandler('admin'),
  requestValidationHandler(academic_department_zod_schema),
  AcademicDepartmentController.createAcademicDepartment
)

router.patch(
  '/:id',
  authHandler('admin'),
  requestValidationHandler(academic_department_update_zod_schema),
  AcademicDepartmentController.updateAcademicDepartment
)
router.get(
  '/:id',
  authHandler('admin', 'faculty', 'student'),
  AcademicDepartmentController.singleAcademicDepartment
)

router.delete(
  '/:id',
  authHandler('admin'),
  AcademicDepartmentController.deleteAcademicDepartment
)

router.get(
  '/',
  authHandler('admin', 'faculty', 'student'),
  AcademicDepartmentController.allAcademicDepartments
)

export const AcademicDepartmentRoute = router
