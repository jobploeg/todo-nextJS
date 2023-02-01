import React, {useEffect, useState} from 'react';

const Completed = () => {

    const [completedTodos, setCompletedTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //get todos from api
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                //get deleted todos and set to state
                const deletedData = data.todos.filter((todo) => todo.state === 'completed');
                setCompletedTodos(deletedData);
                setIsLoading(false);
            })
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/api/todos/${id}`, {
            method: 'DELETE',
        });
    }

    if (isLoading) return <div className={"flex justify-center text-xl"}>Loading...</div>
    if (completedTodos.length === 0) return <div className={"flex justify-center text-3xl mt-14"}>No deleted todos</div>

    return (
        <div className={"my-28 mx-36 "}>
            {/*<h1 className={"text-3xl text-center mb-28"}>Completed</h1>*/}
            <ul className={"text-center flex flex-wrap"}>
                {completedTodos.map((todo) => (
                    <li key={todo.id} onClick={() => handleDelete(todo.id)} className={"m-10 text-3xl px-10 font-extralight border border-gray-600 rounded py-1 hover:scale-105 hover:line-through"}>
                        { todo.title }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Completed;