module.exports = {
  host: '0.0.0.0',
  port: 1337,
  publicURL: 'http://localhost:1337',
  database: {
    client: 'mssql',
    host: 'localhost',
    port: 5432,
    user: 'db_user',
    password: 'db_password',
    database: 'bullet_proof',
    tablePrefix: 'bp',
  },
  key: 'bullet_proof_key',
  secret: '$uper$ecret|3ullet',
}
