import {useEffect, useState} from "react";

export const useRequestGetTodos = (todos, setTodos, urlTodos, refresh) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(urlTodos)
            .then((todos) => todos.json())
            .then(todo => {
                setTodos(todo)
                console.log(todo)
            })
            .catch(err => {
                console.error('Error:', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [refresh])
    return {
        todos,
        loading
    }
}