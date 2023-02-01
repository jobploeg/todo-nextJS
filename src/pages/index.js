import React from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState([]);
    const [todos, setTodos] = useState([]);

    //get todoslist  from localstorage
    useEffect(() => {
        // If localstorage todos does not exist, create it
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        if (window) {
            const data = JSON.parse(localStorage.getItem('todos') || [] );
            //set todoslist to state
            if (data) {
                setTodos(data);
            }
        }
    }, []);

    // add new todo to state and local storage
    const addNewTodo = (content) => {
        const localTodos = JSON.parse(localStorage.getItem('todos') || [] );
        const newTodo = [...localTodos, {
            id: Math.random().toString(),
            content: content,
            state: 'active',
        }];
        setTodos(newTodo);
        localStorage.setItem('todos', JSON.stringify(newTodo));
    }

    // delete todo
    const deleteTodoHandler = (id) => {
        todos.map((todo) => {
            if (todo.id === id) {
                todo.state = 'deleted';
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        setTodos(JSON.parse(localStorage.getItem('todos') || [] ))
    }

    const completedTodoHandler = (id) => {
        todos.map((todo) => {
            if (todo.id === id) {
                todo.state = 'completed';
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        setTodos(JSON.parse(localStorage.getItem('todos') || [] ))
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
            addNewTodo(input);
        }
    }

    return (
    <>
        <form onSubmit={handleSubmit} >
            <div className="validation flex justify-center mt-24 mb-1"></div>
            <div className={"flex justify-center"}>
                <input
                    type="text"
                    placeholder=" "
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className={"border border-gray-600 rounded-l w-1/5 h-14 text-2xl pl-1"}
                />
                <button onClick={(event) => handleSubmit(event)} className={"border border-gray-600 hover:bg-gray-300 rounded-r px-5 bg-gray-200"}>Add</button>
            </div>
        </form>
        <div className={"flex justify-center mt-14"}>
            <div className={"w-2/6 text-center"}>
                {todos.map((todo) => {
                    return todo.state === 'active' &&
                        <div className={"flex justify-center h-12"}>
                            <div onClick={() => deleteTodoHandler(todo.id)} key={todo.id} className={"my-1 text-3xl hover:line-through font-extralight hover:scale-105 "}>
                                {todo.content}
                            </div>
                            <div onClick={() => completedTodoHandler(todo.id)} key={todo.id} className={"font-extralight rounded py-1 text-2xl mt-1 px-4 hover:cursor-pointer hover:scale-125"}> &#10003; </div>
                        </div>
                    }
                )}
            </div>
        </div>

    </>
  )
}
