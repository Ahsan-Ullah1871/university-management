import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { AcademicDepartmentController } from './academicDepartment.controller'
import {
  academic_department_update_zod_schema,
  academic_department_zod_schema,
} from './academicDepertment.validation'

const router = express.Router()

router.post(
  '/create-department',
  requestValidationHandler(academic_department_zod_schema),
  AcademicDepartmentController.createAcademicDepartment
)

router.patch(
  '/:id',
  requestValidationHandler(academic_department_update_zod_schema),
  AcademicDepartmentController.updateAcademicDepartment
)
router.get('/:id', AcademicDepartmentController.singleAcademicDepartment)

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment)

router.get('/', AcademicDepartmentController.allAcademicDepartments)

export const AcademicDepartmentRoute = router
