exports.TodoGetListHandler = ctx =>
  async function(req, res) {

    const result = await ctx.models.Todo.findAll({})
    res.json({
      data: result
    })
  }

exports.TodoCreateHandler = ctx =>
  async function(req, res) {
    const { title, description } = req.body

    const result = await ctx.models.Todo.create({
      title,
      description
    })
    res.json({
      data: result
    })
  }
