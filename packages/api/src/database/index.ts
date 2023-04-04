import { resolve } from 'node:path'
import knex, { type Knex } from 'knex'
import { getConfig } from '../config'

let __database: Knex

export const getDatabase = (): Knex => {
  if (!__database) {
    console.warn('___INITIATING DATABASE ___')
    const { database: { host, port, user, password, database } } = getConfig()

    __database = knex({
      client: 'mssql',
      connection: {
        host,
        port,
        user,
        password,
        database,
      },
      migrations: {
        tableName: '_migrations',
        directory: resolve(__dirname, 'migrations'),
      },
      seeds: {
        directory: resolve(__dirname, 'seeds'),
      },
    })
  }
  return __database
}

export const loadDatabase = async () => {
  getDatabase()
  // await __database.migrate.rollback()
  // await __database.migrate.latest()
  // await __database.seed.run()
}
