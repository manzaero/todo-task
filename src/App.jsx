import { Route, Routes } from "react-router-dom";
import {MainPage} from "./pages/MainPage.jsx";
import {TaskPage} from "./pages/TasksPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";


export const App = function () {
    const urlTodos = `http://localhost:3000/todos`;

    return (
        <Routes>
            <Route path="/" element={<MainPage urlTodos={urlTodos} />} />
            <Route path="/task/:id" element={<TaskPage urlTodos={urlTodos}/>} />
            <Route path="/404" element={<NotFoundPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}