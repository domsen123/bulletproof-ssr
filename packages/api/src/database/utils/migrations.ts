import type { Knex } from 'knex'

export const createTable = async (knex: Knex, tableName: string, cb: (table: Knex.CreateTableBuilder) => void, accountability = true) => {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().notNullable()
    cb(table)

    if (accountability) {
      table.uuid('created_by').notNullable()
      table.uuid('updated_by').notNullable()
    }

    table.timestamp('created_at').notNullable()
    table.timestamp('updated_at').notNullable()
  })
}
