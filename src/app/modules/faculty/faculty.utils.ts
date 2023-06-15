import { Faculty } from './faculty.model'

export const generate_faculty_id = async () => {
  const last_faculty_id = await Faculty.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  const lastId = last_faculty_id ? last_faculty_id.id.substring(2) : '00000'

  const newId = String(parseInt(lastId) + 1).padStart(5, '0')

  return `F-${newId}`
}
