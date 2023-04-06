import { resolve } from 'node:path'
import { program } from 'commander'
import { getDatabase } from './src/database'

program.command('db:migrate').action(async () => {
  const db = getDatabase()
  try {
    await db.migrate.latest({
      directory: resolve(__dirname, 'dist/database/migrations'),
    })
    console.log('Database migrated')
    process.exit(0)
  }
  catch (e: any) {
    console.error(e)
    process.exit(1)
  }
})

program.command('db:seed').action(async () => {
  const db = getDatabase()
  try {
    await db.seed.run({
      directory: resolve(__dirname, 'dist/database/seeds'),
    })
    console.log('Database seeded')
    process.exit(0)
  }
  catch (e: any) {
    console.error(e)
    process.exit(1)
  }
})

program.parse()
