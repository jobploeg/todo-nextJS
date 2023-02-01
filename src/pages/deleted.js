import React, {useEffect, useState} from 'react';

const Deleted = () => {

    const [deletedTodos, setDeletedTodos] = useState([]);

    //get todoslist  from localstorage
    useEffect(() => {
        // If localstorage todos does not exist, create it
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        if (window) {
            const data = JSON.parse(localStorage.getItem('todos') || [] );

            // filter deleted todos
            const deletedData = data.filter((todo) => todo.state === 'deleted');

            //set todoslist to state
            setDeletedTodos(deletedData);
        }
    }, []);


    // If no deleted todos, show message
    if (deletedTodos.length === 0) {
        return (
            <div className={"my-28 mx-36"}>
                <h1 className={"text-3xl font-extralight text-center"}>No Deleted Todos</h1>
            </div>
        );
    }

    return (
        <div className={"my-28 mx-36"}>
            {/*<h1 className={"text-3xl text-center mb-28"}>Deleted</h1>*/}
            <ul className={"text-center flex flex-wrap"}>
                {deletedTodos.map((todo) => (
                    <li key={todo.id} className={"m-10 text-3xl px-10 font-extralight border border-gray-600 rounded py-1 hover:scale-105"}>
                        { todo.content }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Deleted;

