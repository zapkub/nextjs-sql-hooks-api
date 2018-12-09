const Sequelize = require('sequelize')
const next = require('next')
const views = next({ dev: true })
const handle = views.getRequestHandler()

function InitializeDatabaseConnection() {
  // config database connection here
  const connection = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: './db.sqlite',
    operatorsAliases: false

    // if mysql
    // dialect: 'mysql',
    // host: "mysql://localhost"
  })
  return connection
}

const DatabaseConnectionPool = {
  _connection: null,
  _models: null,
  async init() {
    this._connection = InitializeDatabaseConnection()
    const Todo = require('./models/Todo').createModel(this._connection)
    this._models = {
      Todo
    }

    // Run database migration auto sync
    // from sequlize
    await this._connection.sync()
  },
  get connection() {
    if (this._connection === null) {
      throw new Error(
        'Database connection not found... please call init before using connection'
      )
    }
  }
}

async function startServer() {
  // init dependency context
  await DatabaseConnectionPool.init()
  const app = require('express')()
  app.use(require('body-parser').json())
  const ApplicationContext = {
    models: DatabaseConnectionPool._models
  }

  // Register Route handler
  const TodoController = require('./controllers/TodoController')
  app.get('/todo/_list', TodoController.TodoGetListHandler(ApplicationContext))
  app.post('/todo', TodoController.TodoCreateHandler(ApplicationContext))

  // everthing fallback to views
  await views.prepare()
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(3000, function() {
    console.log('Application start on :3000')
  })
}

startServer()
