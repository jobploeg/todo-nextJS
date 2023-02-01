import React from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState([]);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                const todos = data.todos.filter((todo) => todo.state === 'active');
                setTodos(todos);
                setIsLoading(false);
            })
    }, [])

    // add new todo to state and local storage
    const addNewTodo = async (content) => {
        const response = await fetch('http://localhost:8000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: content, state: 'active'})
        });
        const data = await response.json();
        setTodos([...todos, data.todo]);
    }
    //
    // delete todo
    const deleteTodoHandler = async (id) => {
        await fetch(`http://localhost:8000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({state: 'deleted'})
        })
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const completedTodoHandler = async (id) => {
        await fetch(`http://localhost:8000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({state: 'completed'})
        })
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    // handle input change
    const handleSubmit = (event) => {
        event.preventDefault();

        //Get validation text
        let validation_text = document.querySelector('.validation');

        //check if input is empty
        if (input === null || input === '' || input === '  ') {
            validation_text.innerHTML = '<p style="color: red;">Product cant be empty!</p>';
        } else {
            validation_text.innerHTML = '<p style="color: red;"></p>';
            setInput('');
            addNewTodo(input)
        }
    }

    if (isLoading) return <div className={"flex justify-center text-xl"}>Loading...</div>


    return (
    <>
        <form onSubmit={handleSubmit} >
            <div className="validation flex justify-center mt-20 mb-1"></div>
            <div className={"flex justify-center"}>
                <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className={"border border-gray-600 rounded-l md:w-1/5 h-14 text-2xl shadow"}
                    data-testid="input"
                />
                <button onClick={(event) => handleSubmit(event)} className={"border border-gray-600 hover:bg-gray-300 rounded-r px-5 bg-gray-200 shadow"} data-testid="add-button">Add</button>
            </div>
        </form>
        <div className={"flex justify-center"}>
            <div className={"flex flex-col mt-14 justify-center"}>
                {todos.map((todo) => (
                    <div className={"flex"} key={todo.id}>
                        <p className={"my-1 text-3xl font-light hover:cursor-pointer w-64"}>
                            {todo.title}
                        </p>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:scale-110 mt-3 ml-10" onClick={() => completedTodoHandler(todo.id)} data-testid="completed-button">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:scale-110 mt-3 ml-3" onClick={() => deleteTodoHandler(todo.id)} data-testid="deleted-button">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                            </svg>
                        </button>


                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

