import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { FacultyController } from './faculty.controller'
import {
  create_faculty_zod_schema,
  update_faculty_zod_schema,
} from './faculty.validation'

const router = express.Router()

router.post(
  '/create-faculty',
  requestValidationHandler(create_faculty_zod_schema),
  FacultyController.createFaculty
)

router.get('/', FacultyController.allFaculties)

router.get('/:id', FacultyController.singleFaculty)

router.patch(
  '/:id',
  requestValidationHandler(update_faculty_zod_schema),
  FacultyController.updateFaculty
)

export const FacultyRoute = router
