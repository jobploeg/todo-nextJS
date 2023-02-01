import React, {useEffect, useState} from 'react';

const Completed = () => {

    const [completedTodos, setCompletedTodos] = useState([]);

    // Get todoslist  from localstorage
    useEffect(() => {
        // If localstorage todos does not exist, create it
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        if (window) {
            const data = JSON.parse(localStorage.getItem('todos') || [] );

            // filter completed todos
            const completedData = data.filter((todo) => todo.state === 'completed');

            //set todoslist to state
            setCompletedTodos(completedData);
        }
    }, []);

    if (completedTodos.length === 0) {
        return (
            <div className={"my-28 mx-36"}>
                <p className={"text-center text-3xl font-extralight"}>No completed todos</p>
            </div>
        );
    }

    return (
        <div className={"my-28 mx-36 "}>
            {/*<h1 className={"text-3xl text-center mb-28"}>Completed</h1>*/}
            <ul className={"text-center flex flex-wrap"}>
                {completedTodos.map((todo) => (
                    <li key={todo.id} className={"m-10 text-3xl px-10 font-extralight border border-gray-600 rounded py-1 hover:scale-105"}>
                        { todo.content }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Completed;