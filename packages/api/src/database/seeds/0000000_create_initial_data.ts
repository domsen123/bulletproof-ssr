import type { Knex } from 'knex'
import type { IRole, IRoleUnsaved, IRoleUser, IRoleUserUnsaved, IUser, IUserUnsaved } from '@bulletproof/shared'
import { getTableName, toNewItem } from '../utils'
import { encryptString } from '../../utils'

const ROLE_TABLE_NAME = 'roles'
const USER_TABLE_NAME = 'users'
const ROLES_USERS_TABLE_NAME = 'roles_users'

export const seed = async (knex: Knex) => {
  await knex(getTableName(ROLE_TABLE_NAME)).delete()
  await knex(getTableName(USER_TABLE_NAME)).delete()
  await knex(getTableName(ROLES_USERS_TABLE_NAME)).delete()

  const [adminRole] = await knex<IRole>(getTableName(ROLE_TABLE_NAME)).insert(
    toNewItem<IRoleUnsaved>({ name: 'Administrators', admin_access: true }),
  ).returning('id')

  const [adminUser] = await knex<IUser>(getTableName(USER_TABLE_NAME)).insert(
    toNewItem<IUserUnsaved>({ mail: 'bullet@proof.com', password: await encryptString('pass4word'), provider: 'local' }),
  ).returning('id')

  if (adminRole && adminUser) {
    await knex<IRoleUser>(getTableName(ROLES_USERS_TABLE_NAME)).insert(
      toNewItem<IRoleUserUnsaved>({
        role_id: adminRole.id,
        user_id: adminUser.id,
      }),
    )
  }
}
