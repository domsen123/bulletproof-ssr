import type { Knex } from 'knex'
import { createTable } from '../utils/migrations'
import { getTableName } from '../utils'

const TABLE_NAME = getTableName('roles_users')

export const up = async (knex: Knex) => {
  await createTable(knex, TABLE_NAME, (table) => {
    table.uuid('role_id').notNullable()
    table.uuid('user_id').notNullable()
  }, false)
}

export const down = async (knex: Knex) => {
  await knex.schema.dropTable(TABLE_NAME)
}
