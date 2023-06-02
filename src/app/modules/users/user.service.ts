import config from '../../../config'
import { generate_user_id } from './user.utils'
import { User } from './users.model'
import { IUser } from './usersInterface'

const create_user = async (user_data: IUser): Promise<IUser | null> => {
  // auto generated ID
  user_data.id = await generate_user_id()

  // default pass
  if (!user_data.password) {
    user_data.password = config.default_user_password as string
  }

  const created_user = await User.create(user_data)

  if (!created_user) {
    throw new Error('Failed to create new user')
  }

  return created_user
}

export default {
  create_user,
}
