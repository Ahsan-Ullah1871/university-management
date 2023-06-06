import { User } from './user.model'

export const generate_user_id = async () => {
  const last_user_id = await User.findOne({}, { id: 1, _id: 0 }).sort({
    createdAt: -1,
  })
  const lastId = last_user_id ? last_user_id.id : '00000'

  const newId = String(parseInt(lastId) + 1).padStart(5, '0')

  return newId
}
