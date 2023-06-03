module.exports = {
  "development": {
    "username": 'postgres',
    "password": 'password',
    "database": 'house_renting',
    "host": 'localhost',
    "port": '5432',
    "dialect": "postgres",
    "migrationStorage": "json", // Use a different storage type. Default: sequelize
  },
  // "development": {
  //   "username": process.env.PG_USER,
  //   "password": process.env.PG_PASSWORD,
  //   "database": process.env.PG_DATABASE,
  //   "host": process.env.PG_HOST,
  //   "port": process.env.PG_PORT,
  //   "dialect": "postgres",
  //   "migrationStorage": "json", // Use a different storage type. Default: sequelize
  // },
  "test": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "dialect": "postgres",
    "migrationStorage": "json",
  },
  "production": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "dialect": "postgres",
    "migrationStorage": "json",
  }
}
