interface DatabaseConfig {
  client: string
  host: string
  port: number
  user: string
  password: string
  database: string
  tablePrefix?: string
}
export interface ServerConfig {
  host: string
  port: number
  publicURL: string
  database: DatabaseConfig
  key: string
  secret: string
}
