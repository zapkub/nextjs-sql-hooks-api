const Sequelize = require('sequelize')
exports.createModel = function(connection) {
  const Todo = connection.define('todo', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
  })

  return Todo
}
