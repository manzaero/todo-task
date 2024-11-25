import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useRequestDeleteTodo, useRequestGetTodos, useRequestUpdateTodo} from "../hooks/index.js";
import styles from "../app.module.css";
import PropTypes from "prop-types";


export const TaskPage = ({urlTodos} ) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [refresh, setRefresh] = useState(false);

    console.log(task)

    const { loading } = useRequestGetTodos([], (data) => { const foundTask = data.find((t) => t.id === id);setTask(foundTask || null);}, urlTodos, refresh);
    const {deleteTodo} = useRequestDeleteTodo(urlTodos, setRefresh, refresh);
    const {updateTodos} = useRequestUpdateTodo(urlTodos, setRefresh, refresh);

    if(!task && !loading){
        return (
            <div className={styles.container}>
                <h2>Task not found</h2>
                <button className={styles.btn} onClick={() => navigate(-1)}>
                    {`<- Back`}
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button className={styles.btn} onClick={() => navigate(-1)}>
                {`<- Back`}
            </button>
            {loading ? (
                <div className={styles.loader}></div>
            ) : (
                <div>
                    <h2>{task.title}</h2>
                    <button
                        className={styles.btn}
                        onClick={() => updateTodos(task.id)}
                    >
                        Update
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => {
                            deleteTodo(task.id);
                            navigate('/');
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
TaskPage.propTypes = {
    urlTodos: PropTypes.string.isRequired,
}