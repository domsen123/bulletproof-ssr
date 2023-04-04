import { getConfig } from '../../config'

export const getTableName = (tableName: string) => {
  const { database: { tablePrefix } } = getConfig()
  return tablePrefix ? `${tablePrefix}_${tableName}` : tableName
}
