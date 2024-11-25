export const useRequestUpdateTodo = (urlTodos, setRefresh, refresh) => {

    const updateTodos = (id) => {
        fetch(`${urlTodos}/${id}`, {
            method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify({
                "title": "updated"
            })
        })
            .then(todo => todo.json())
            .then(todo => {
                console.log(todo)
                setRefresh(!refresh);
            })
            .catch(err => {
                console.error('Error:', err)
            })
    }
    return {
        updateTodos,
    }
}