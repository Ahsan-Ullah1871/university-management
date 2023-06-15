import { IAcademicSemester } from '../academicSemeser/academicSemester.interface'
import { Student } from './student.model'

export const generate_student_id = async (
  academic_semester: IAcademicSemester | null
) => {
  const last_student_id = await Student.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  const lastId = last_student_id ? last_student_id.id.substring(4) : '00000'

  const newId = String(parseInt(lastId) + 1).padStart(5, '0')

  return `${academic_semester?.year.toString().substring(2)}${
    academic_semester?.code
  }${newId}`
}
