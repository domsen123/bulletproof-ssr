import type { Knex } from 'knex'
import { createTable } from '../utils/migrations'
import { getTableName } from '../utils'

const TABLE_NAME = getTableName('roles')

export const up = async (knex: Knex) => {
  await createTable(knex, TABLE_NAME, (table) => {
    table.string('name').notNullable()
    table.text('description')
    table.boolean('admin_access').notNullable()
  }, false)
}

export const down = async (knex: Knex) => {
  await knex.schema.dropTable(TABLE_NAME)
}
