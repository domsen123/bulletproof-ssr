import type { Knex } from 'knex'
import { createTable } from '../utils/migrations'
import { getTableName } from '../utils'

const TABLE_NAME = getTableName('users')

export const up = async (knex: Knex) => {
  await createTable(knex, TABLE_NAME, (table) => {
    table.string('first_name')
    table.string('last_name')
    table.string('mail')
    table.string('password')
    table.string('provider')
    table.string('identifier')
  }, false)
}

export const down = async (knex: Knex) => {
  await knex.schema.dropTable(TABLE_NAME)
}
