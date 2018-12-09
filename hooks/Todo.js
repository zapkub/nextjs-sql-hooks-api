import React from 'react'
import 'isomorphic-fetch'

export default function useTodoAPI(endpoint = '') {
  // List data source
  const [list, setList] = React.useState([])
  function reloadListData() {
    fetch(`${endpoint}/todo/_list`).then(async resp => {
      const result = await resp.json()
      setList(result.data)
    })
  }

  React.useEffect(() => {
    reloadListData()
  }, [])

  return {
    get list() {
      return list
    },

    async createTodo(title, description) {
      await fetch(`${endpoint}/todo`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
      })
      await reloadListData()
    }
  }
}
