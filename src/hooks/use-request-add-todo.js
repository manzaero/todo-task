import {useState} from "react";


export const useRequestAddTodo = (urlTodos, setRefresh, refresh) => {
    const [newTodo, setNewTodo] = useState('')

    const setTodo = (e) => {
        setNewTodo(e.target.value)
    }
    const addTodo = () => {
        if  (!newTodo.trim()) return
        fetch(urlTodos, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "title": newTodo,
            })
        })
            .then(todo => todo.json())
            .then(todo => {
                console.log(todo)
                setRefresh(!refresh)
                setNewTodo('')
            })
            .catch(err => {
                console.error('Error:', err)
            })
    }
    return {
        addTodo,
        newTodo,
        setTodo
    }
}