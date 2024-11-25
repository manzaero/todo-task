import {useState} from "react";
import {useRequestAddTodo, useRequestGetTodos, useRequestSearchTitle} from "../hooks/index.js";
import {useNavigate} from "react-router-dom";
import styles from "../app.module.css";
import PropTypes from "prop-types";



export const MainPage = ({urlTodos} ) => {
    const [refresh, setRefresh] = useState(false)
    const [todos, setTodos] = useState([]);
    const {searchHandler, filteredAndSorted, searchTitle, sortState, sortTodos} = useRequestSearchTitle( todos )
    const {addTodo, newTodo, setTodo} = useRequestAddTodo(urlTodos, setRefresh, refresh)
    const { loading} = useRequestGetTodos(todos, setTodos, urlTodos, refresh);

    console.log(urlTodos)

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2>List todos</h2>
            <input type="text"
                   placeholder="Search..."
                   className={styles.searchInput}
                   value={searchTitle}
                   onChange={searchHandler}
            />
            <input type="text"
                   className={styles.addTodo}
                   placeholder="Add Todo"
                   value={newTodo}
                   onChange={setTodo}
            />
            {loading ? <div className={styles.loader}></div> : filteredAndSorted.length === 0 ?
                <div className={styles.wrong}>Todos not found</div> : <ul>
                    {filteredAndSorted.map((todo) => (<div key={todo.id} className={styles.flex}>
                        <li
                            onClick={() => navigate(`/task/${todo.id}`)}
                            key={todo.id}>{todo.title.length > 10 ? todo.title.slice(0, 10) + '...' : todo.title}</li>
                    </div>))}
                </ul>}
            <button
                className={styles.btn}
                onClick={addTodo}
                disabled={!newTodo}
            >Add
            </button>
            <button
                className={styles.btn}
                onClick={sortTodos}
                disabled={todos.length === 0}
            >{!sortState ? 'Sort' : 'Unsorted'}
            </button>
        </div>
    )
}
MainPage.propTypes = {
    urlTodos: PropTypes.string.isRequired,
}