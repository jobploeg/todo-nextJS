import React, {useEffect, useState} from 'react';

const Deleted = () => {

    const [deletedTodos, setDeletedTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //get todos from api
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                //get deleted todos and set to state
                const deletedData = data.todos.filter((todo) => todo.state === 'deleted');
                setDeletedTodos(deletedData);
                setIsLoading(false);
            })
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/api/todos/${id}`, {
            method: 'DELETE',
        });
        setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
    }


    if (isLoading) return <div className={"flex justify-center text-xl"}>Loading...</div>
    if (deletedTodos.length === 0) return <div className={"flex justify-center text-3xl mt-14"}>No deleted todos</div>


    return (
        <div className={"my-28 md:mx-36"}>
            <ul className={"text-center flex md:flex-wrap flex-col md:flex-row"}>
                {deletedTodos.map((todo) => (
                    <li key={todo.id} className={"md:m-10 text-3xl px-5 font-extralight border-b border-gray-500 mx-10 mt-5 py-1 flex flex-row hover:border-red-600"}>
                        <p className={""}>{ todo.title }</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:scale-110 ml-7 mt-2 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(todo.id)} >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Deleted;

