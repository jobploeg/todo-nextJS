import React from 'react';
import { useState, useEffect } from 'react';
import { Todos } from '../pages/api/getTodos';

export default function Home() {
    const [input, setInput] = useState([]);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
        });
    }

    const completedTodoHandler = async (id) => {
        await fetch(`http://localhost:8000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({state: 'completed'})
        });
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
            //execute function addnewtodo .then to update state
            addNewTodo(input).then(() => {

            })
        }
    }

    if (isLoading) return <div className={"flex justify-center text-xl"}>Loading...</div>
    if (todos.length === 0) return <div className={"flex justify-center text-3xl mt-14"}>No todos</div>


    return (
    <>
        <form onSubmit={handleSubmit} className={"mt-16"} >
            <div className="validation flex justify-center mt-24 mb-1"></div>
            <div className={"flex justify-center"}>
                <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className={"border border-gray-600 rounded-l w-1/5 h-14 text-2xl pl-1"}
                />
                <button onClick={(event) => handleSubmit(event)} className={"border border-gray-600 hover:bg-gray-300 rounded-r px-5 bg-gray-200"}>Add</button>
            </div>
        </form>
        <div className={"flex justify-center text-center"}>
        <ul className={"flex mt-28 flex-wrap w-3/5 gap-10"}>
            {todos.map((todo) => {
                return todo.state === 'active' &&
                    <div className={"flex"}>
                        <div onClick={() => deleteTodoHandler(todo.id)} key={todo.id} className={"my-1 text-2xl hover:line-through font-light  hover:scale-105 "}>
                            {todo.title}
                        </div>
                        <div onClick={() => completedTodoHandler(todo.id)} key={todo.id} className={"font-extralight rounded py-1 text-xl mt-1 px-4 hover:cursor-pointer hover:scale-125"}> &#10003; </div>
                    </div>
                }
            )}
        </ul>
        </div>
    </>
  )
}

