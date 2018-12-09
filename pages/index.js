import Head from 'next/head'
import useTodoAPI from '../hooks/Todo'

export default () => {
  const { list, createTodo } = useTodoAPI()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleTitleInput(e) {
    setTitle(e.target.value)
  }

  function handleDescriptionInput(e) {
    setDescription(e.target.value)
  }

  function handleOnClick() {
    createTodo(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous"
        />
      </Head>
      <div className="container">
        <h3>{'Todo list'}</h3>
      </div>
      <div className="container form-inline">
        <div className="form-group">
          <input
            value={title}
            onChange={handleTitleInput}
            className="form-control"
            placeholder="Todo title"
          />
        </div>
        <div className="form-group ml-2">
          <input
            value={description}
            onChange={handleDescriptionInput}
            className="form-control"
            placeholder="Todo description"
          />
        </div>
        <div className="form-group ml-2">
          <button onClick={handleOnClick} className="btn btn-primary">
            {'Submit new todo'}
          </button>
        </div>
      </div>
      <div className="container">
        {list.map(todo => {
          return (
            <div className="card my-3" style={{ width: 180 }} key={todo.id}>
              <div className="card-body">
                <div>{`id: ${todo.id}`}</div>
                <h5 className="card-title">{`Title: ${todo.title}`}</h5>
                <p dangerouslySetInnerHTML={{ __html: todo.description }} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
